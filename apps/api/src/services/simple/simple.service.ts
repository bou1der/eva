import { CreateUserDto } from '@nest/user/dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class SimpleService {
  constructor(@Inject('SIMPLE_SERVICE') private readonly client: ClientKafka) {}
  async getData(dto: CreateUserDto) {
    // const t = this.client.emit('hello-patern', JSON.stringify(dto))
    this.client.subscribeToResponseOf('hello-patern');
    const test = this.client.send('hello-patern', JSON.stringify(dto));
    test.subscribe((value) => {
      console.log(value);
    });
    // this.client.connect
    // this.client.subscribeToResponseOf("hello-patern")
    // return this.client.send("hello-patern", JSON.stringify(dto))
    // return;
  }
}
