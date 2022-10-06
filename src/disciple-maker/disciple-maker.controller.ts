import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DiscipleMakerService } from './disciple-maker.service';
import { CreateDiscipleMakerDto } from './dto/create-disciple-maker.dto';
import { UpdateDiscipleMakerDto } from './dto/update-disciple-maker.dto';

@Controller('disciple-maker')
export class DiscipleMakerController {
  constructor(private readonly discipleMakerService: DiscipleMakerService) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  create(@Body() createDiscipleMakerDto: CreateDiscipleMakerDto) {
    return this.discipleMakerService.create(createDiscipleMakerDto);
  }

  @Get()
  findAll() {
    return this.discipleMakerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.discipleMakerService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDiscipleMakerDto: UpdateDiscipleMakerDto,
  ) {
    return this.discipleMakerService.update(id, updateDiscipleMakerDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.discipleMakerService.remove(id);
  }
}
