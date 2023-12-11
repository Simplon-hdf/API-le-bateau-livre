import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HumanInformationsService } from './human-informations.service';
import { CreateHumanInformationDto } from './dto/create-human-information.dto';
import { UpdateHumanInformationDto } from './dto/update-human-information.dto';

@Controller('human-informations')
export class HumanInformationsController {
  constructor(private readonly humanInformationsService: HumanInformationsService) {}

  @Post()
  create(@Body() createHumanInformationDto: CreateHumanInformationDto) {
    return this.humanInformationsService.create(createHumanInformationDto);
  }

  @Get()
  findAll() {
    return this.humanInformationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.humanInformationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHumanInformationDto: UpdateHumanInformationDto) {
    return this.humanInformationsService.update(+id, updateHumanInformationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.humanInformationsService.remove(+id);
  }
}
