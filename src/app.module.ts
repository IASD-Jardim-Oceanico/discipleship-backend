import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

const MONGO_DB_URL = 'mongodb://localhost:27017/health-fair';

@Module({
  imports: [MongooseModule.forRoot(MONGO_DB_URL), UsersModule],
})
export class AppModule {}
