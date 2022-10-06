import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscipleMaker } from './disciple-maker/disciple-maker.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
        }),
      ],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGO_HOST'), // Loaded from .ENV
      }),
    }),
    DiscipleMaker,
  ],
})
export class AppModule {}
