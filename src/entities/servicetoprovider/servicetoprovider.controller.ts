import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServicetoproviderService } from './servicetoprovider.service';
import { CreateServicetoproviderDto } from './dto/create-servicetoprovider.dto';
import { Public } from 'src/auth/public.route';
import { Role } from 'src/roleenum/role';
import { Roles } from 'src/auth/roles.decorator';

@Controller('servicetoprovider')
export class ServicetoproviderController {
  constructor(private readonly servicetoproviderService: ServicetoproviderService) {}

  @Post()
  create(@Body() createServicetoproviderDto: CreateServicetoproviderDto) {
    return this.servicetoproviderService.create(createServicetoproviderDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.servicetoproviderService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicetoproviderService.findOne(id);
  }

  @Roles(Role.PROVIDER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicetoproviderService.remove(id);
  }
}
