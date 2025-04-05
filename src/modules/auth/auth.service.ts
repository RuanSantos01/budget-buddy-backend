import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { CodeReturn } from 'src/shared/enum/code-return.enum';
import { UsersService } from '../users/users.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/singin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async singin(signinDto: SigninDto) {
    const { email, password } = signinDto;

    const user = await this.usersService.getUserByEmail(email);

    if (!user) throw new UnauthorizedException('Invalid credentials.');
    if (!user.isActive)
      throw new UnauthorizedException({
        message: CodeReturn.AUTH.ATH_401_002.description,
        status: CodeReturn.AUTH.ATH_401_002.status,
      });

    const passwordMatches = await compare(password, user.password);

    if (!passwordMatches) throw new UnauthorizedException('Invalid credentials.');

    return await this.generateAccessToken(user.id, user.isActive);
  }

  async signup(signupDto: SignupDto) {
    const { name, email, password } = signupDto;

    const emailTaken = await this.usersService.getUserByEmail(email);

    if (emailTaken) throw new ConflictException('Email already taken');

    const hasedPassword = await hash(password, 10);

    const user = await this.usersService.create({
      name,
      email,
      isActive: true,
      password: hasedPassword,
      categories: {
        createMany: {
          data: [
            { name: 'Salário', icon: 'travel', type: 'INCOME' },
            { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
            { name: 'Outro', icon: 'other', type: 'INCOME' },
            { name: 'Casa', icon: 'home', type: 'EXPENSE' },
            { name: 'Alimentação', icon: 'food', type: 'EXPENSE' },
            { name: 'Educação', icon: 'education', type: 'EXPENSE' },
            { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
            { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
            { name: 'Roupa', icon: 'clothes', type: 'EXPENSE' },
            { name: 'Transporte', icon: 'car', type: 'EXPENSE' },
            { name: 'Saúde', icon: 'health', type: 'EXPENSE' },
            { name: 'Outro', icon: 'other', type: 'EXPENSE' },
          ],
        },
      },
    });

    return await this.generateAccessToken(user.id, true);
  }

  private async generateAccessToken(userId: string, isActive: boolean) {
    return {
      'access-token': await this.jwtService.signAsync({ sub: userId, isActive }),
    };
  }
}
