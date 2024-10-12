import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { HiringService } from './hiring.service';
import { CreateHiringDto } from './dto/create-hiring.dto';

@Controller('hiring')
export class HiringController {
  constructor(private readonly hiringService: HiringService) {}

  @Post()
  create(@Body() createHiringDto: CreateHiringDto) {
    return this.hiringService.create(createHiringDto);
  }

  @Get()
  findAll() {
    return this.hiringService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hiringService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hiringService.remove(id);
  }
}
