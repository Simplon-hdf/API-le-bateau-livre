import { PartialType } from '@nestjs/mapped-types';
import { CreateHumanInformationDto } from './create-human-information.dto';

export class UpdateHumanInformationDto extends PartialType(CreateHumanInformationDto) {}
