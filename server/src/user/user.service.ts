import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserDTO, UserRegisterDTO, UserSO } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  login = async (data: UserDTO): Promise<UserSO> => {
    const { email, password } = data;
    const user = await this.userRepository.findOneBy({ email });
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user.sanitizeObject({ withToken: true });
  };

  register = async (data: UserRegisterDTO): Promise<UserSO> => {
    const { email } = data;
    console.log(data);
    let user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    } else {
      user = this.userRepository.create(data);
      await this.userRepository.save(user);
      return user.sanitizeObject({ withToken: true });
    }
  };

  getProfile = async (email: string): Promise<any> => {
    const user = await this.userRepository.findOneBy({ email });
    if (!user)
      throw new HttpException('Email does not exists', HttpStatus.NOT_FOUND);
    return user.sanitizeObject({ withToken: true });
  };

  getAllUser = async (): Promise<UserSO[]> => {
    const users = await this.userRepository.find();

    return users.map((user) => user.sanitizeObject());
  };

  deleteUser = async (email: string, yourId: string): Promise<any> => {
    const user = await this.userRepository.findOneByOrFail({ email });

    if (user.id === yourId) {
      throw new HttpException(
        "You can't delete yourself",
        HttpStatus.BAD_REQUEST,
      );
    }

    this.userRepository.remove(user);

    return user;
  };
}
