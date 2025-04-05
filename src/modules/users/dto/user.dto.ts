import { IsBoolean, IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  categories: Object;
}
