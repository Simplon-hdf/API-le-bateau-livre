import { PartialType } from '@nestjs/mapped-types';
import { CreateBorrowerDto } from './create-borrower.dto';

export class UpdateBorrowerDto extends PartialType(CreateBorrowerDto) {}
