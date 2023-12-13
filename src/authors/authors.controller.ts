import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('authors')
@ApiTags('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
  return this.authorsService.create(createAuthorDto);
 }

  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':uuid')
  public getByUUID(@Param('uuid') uuid: string) {
    return this.authorsService.getByUUID(uuid);
  }

  @Patch(':uuid')
  public updateByUUID(
    @Param('uuid') uuid: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    return this.authorsService.updateByUUID(uuid, updateAuthorDto);
  }

  @Delete(':uuid')
  public deleteByUUID(@Param('uuid') uuid: string) {
    return this.authorsService.deleteByUUID(uuid);
  }
}