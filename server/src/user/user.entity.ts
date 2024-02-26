import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  // OneToMany,
  UpdateDateColumn,
} from 'typeorm';

import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
// import { TodoEntity } from 'src/todo/todo.entity';
import { UserSO } from './user.dto';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    unique: true,
  })
  email: string;

  @Column('text')
  password: string;

  @Column('text')
  username: string;

  @Column('text')
  fullname: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  hashPassword = async () => {
    this.password = await hash(this.password, 8);
  };

  //   @OneToMany((type) => TodoEntity, (todo) => todo.author)
  //   todos: TodoEntity[];

  comparePassword = async (attempt: string) => {
    return await compare(attempt, this.password);
  };

  sanitizeObject = (options?: SanitizeUserOptions): UserSO => {
    const { id, createdAt, email, token, username, fullname } = this;
    const responseObj = { id, createdAt, email, username, fullname };
    if (options?.withToken) {
      Object.assign(responseObj, { token });
    }
    return responseObj;
  };

  private get token() {
    const { id, email } = this;
    return sign(
      {
        id,
        email,
      },
      process.env.SECRET,
      { expiresIn: '3d' },
    );
  }
}

type SanitizeUserOptions = {
  withToken?: boolean;
};
