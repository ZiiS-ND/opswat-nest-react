import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class UserDTO {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}

export class UserRegisterDTO {
  @IsEmail()
  email: string;

  @MinLength(6)
  @MaxLength(12)
  username: string;

  fullname: string;

  @MinLength(6)
  @MaxLength(18)
  password: string;
}

export type UserSO = {
  id: string;
  createdAt: Date;
  email: string;
  username: string;
  fullname: string;
};
