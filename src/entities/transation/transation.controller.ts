import { Controller, Get, Post, Body} from '@nestjs/common';
import { TransationService } from './transation.service';
import { CreateTransationDto } from './dto/create-transation.dto';
import { Role } from 'src/roleenum/role';
import { Roles } from 'src/auth/roles.decorator';

@Controller('transation')
export class TransationController {
  constructor(private readonly transationService: TransationService) {}

  @Post()
  create(@Body() createTransationDto: CreateTransationDto) {
    return this.transationService.create(createTransationDto);
  }

  @Roles(Role.PROVIDER, Role.CUSTOMER, Role.ADMIN)
  @Get()
  findAll() {
    return this.transationService.findAll();
  }
}
