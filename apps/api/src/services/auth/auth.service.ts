import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from '~/libs/shared/src/lib/dto';
import { UserEntity } from '~/libs/shared/src/lib/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientKafka) {}
  async RegisterUser(dto: CreateUserDto) {
    this.client.subscribeToResponseOf('create-user');
    const user = this.client
      .send('create-user', JSON.stringify(dto))
      .subscribe((value) => {
        console.log(value);
        return value;
      });
    console.log(user);
  }
  getUser(dto: CreateUserDto) {
    this.client.subscribeToResponseOf('get-user');
    const user = this.client
      .send('get-user', JSON.stringify(dto))
      .subscribe((value: UserEntity) => {
        console.log(value);
        return value;
      });
    return user;
  }
}
