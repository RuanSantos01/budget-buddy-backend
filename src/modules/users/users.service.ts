import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async create(createDto: UserDto) {
    return await this.usersRepo.create({ data: createDto });
  }

  async getUserById(userId: string) {
    return await this.usersRepo.findUnique({
      where: { id: userId },
      select: { name: true, email: true, isActive: true },
    });
  }

  async getUserByEmail(email: string) {
    return await this.usersRepo.findUnique({
      where: { email },
    });
  }

  async logicalDeleteUser(userId: string) {
    const user = await this.usersRepo.findUnique({
      where: { id: userId },
      select: { isActive: true },
    });

    if (!user?.isActive) throw new ConflictException('User already deleted.');

    await this.usersRepo.logicalDeleteUser({
      where: { id: userId },
      data: { isActive: false },
    });

    const updatedJwt = await this.jwtService.signAsync({ sub: userId, isActive: false });

    return {
      message: 'User deleted successfully.',
      'access-token': updatedJwt,
    };
  }
}
