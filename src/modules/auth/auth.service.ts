import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/singin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepository, 
    private readonly jwtService: JwtService
  ) {}

  async singin(signinDto: SigninDto) {
    const { email, password } = signinDto;

    const user = await this.usersRepo.findUnique({
      where: { email },
    })

    if(!user) throw new UnauthorizedException('Invalid credentials.'); 

    const passwordMatches = await compare(password, user.password);

    if(!passwordMatches) throw new UnauthorizedException('Invalid credentials.'); 

    return await this.generateAccessToken(user.id);
  }  
  
  async signup(signupDto: SignupDto) {
    const { name, email, password } = signupDto;

    const emailTaken = await this.usersRepo.findUnique({
      where: { email },
      select: { id: true },
    });

    const hasedPassword = await hash(password, 10);

    if (emailTaken) {
      throw new ConflictException('Email already taken');
    }

    const user = await this.usersRepo.create({
      data: { name, email, password: hasedPassword,
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
            ]
          }
        }
       },
    });

    return await this.generateAccessToken(user.id);
  }

  private async generateAccessToken(userId: string) {
    return {
      accessToken : await this.jwtService.signAsync({ sub: userId }) 
    }
  }
}
