import { PartialType } from '@nestjs/mapped-types';
import { CreateHiringDto } from './create-hiring.dto';

export class UpdateHiringDto extends PartialType(CreateHiringDto) {}
