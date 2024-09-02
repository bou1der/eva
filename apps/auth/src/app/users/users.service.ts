import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@Inject() private readonly db: DataSource) {}

  // async findById(id: string) {
  //   const db = this.db.getRepository(UserEntity);
  //   const existUser = await db.findOne({
  //     where: {
  //       id,
  //     },
  //   })[0];
  //   if(!existUser){
  //     throw new
  //   }
  // }
}
