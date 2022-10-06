import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscipleMakerController } from './disciple-maker.controller';
import { DiscipleMakerService } from './disciple-maker.service';
import { DiscipleMakerSchema } from './schemas/disciple-maker.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'DiscipleMaker', schema: DiscipleMakerSchema },
    ]),
  ],
  controllers: [DiscipleMakerController],
  providers: [DiscipleMakerService],
})
export class DiscipleMaker {}
