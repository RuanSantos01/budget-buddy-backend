import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { compare, hash } from 'bcryptjs';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { CodeReturn } from 'src/shared/enum/code-return.enum';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/singin.dto';
import { User } from './entities/user';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async create(createDto: User) {
    return await this.usersRepo.create({ data: createDto });
  }

  async getUserById(userId: string) {
    return await this.usersRepo.findUnique({
      where: { id: userId },
      select: { name: true, email: true, isActive: true },
    });
  }

  private async getUserByEmail(email: string) {
    return await this.usersRepo.findUnique({
      where: { email },
      select: { isActive: true, id: true, password: true },
    });
  }

  async logicalDeleteUser(userId: string) {
    const user = await this.usersRepo.findUnique({
      where: { id: userId },
      select: { isActive: true },
    });

    if (!user?.isActive) throw new ConflictException('User already deleted.');

    await this.usersRepo.updateUser({
      where: { id: userId },
      data: { isActive: false, deletedAt: new Date() },
    });

    const updatedJwt = await this.jwtService.signAsync({ sub: userId, isActive: false });

    return {
      message: 'User deleted successfully.',
      'access-token': updatedJwt,
    };
  }

  async reactiveUser(signinDto: SigninDto) {
    const { email } = signinDto;
    const user = await this.getUserByEmail(email);

    if (!user) throw new NotFoundException('User not found.');
    if (user.isActive) throw new ConflictException('User already active.');

    await this.usersRepo.updateUser({
      where: { email },
      data: { isActive: true, deletedAt: null },
    });

    return await this.singin(signinDto);
  }

  async singin(signinDto: SigninDto) {
    const { email, password } = signinDto;

    const user = await this.getUserByEmail(email);

    if (!user) throw new UnauthorizedException(CodeReturn.AUTH.ATH_401_001);
    if (!user.isActive) throw new UnauthorizedException(CodeReturn.AUTH.ATH_401_002);

    const passwordMatches = await compare(password, user.password);

    if (!passwordMatches) throw new UnauthorizedException(CodeReturn.AUTH.ATH_401_001);

    return await this.generateAccessToken(user.id, user.isActive);
  }

  async signup(signupDto: SignupDto) {
    const { name, email, password } = signupDto;

    const emailTaken = await this.getUserByEmail(email);

    if (emailTaken) throw new ConflictException(CodeReturn.AUTH.ATH_409_003);

    const hasedPassword = await hash(password, 10);

    const user = await this.create({
      name,
      email,
      isActive: true,
      password: hasedPassword,
    });

    return await this.generateAccessToken(user.id, true);
  }

  private async generateAccessToken(userId: string, isActive: boolean) {
    return {
      'access-token': await this.jwtService.signAsync({ sub: userId, isActive }),
    };
  }
}
