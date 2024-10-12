import { Controller, Get, Post, Body,Param, Delete } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { Public } from 'src/auth/public.route';

@Controller('provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Public()
  @Post()
  create(@Body() createproviderDto: CreateProviderDto) {
    return this.providerService.create(createproviderDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.providerService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.providerService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
     this.providerService.remove(id);
  }
}
