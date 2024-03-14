import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './user/user.controller';
import { UsersService } from './user/user.service';
import { User, UserSchema } from './user/user.schema';
import { LoadBalancerModule } from './load-nodejs-cluster/load-nodejs-cluster.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:example@localhost:27017'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    LoadBalancerModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppMultiModule {}
