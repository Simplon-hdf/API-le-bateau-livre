import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BorrowersService } from './borrowers.service';
import { CreateBorrowerDto } from './dto/create-borrower.dto';
import { UpdateBorrowerDto } from './dto/update-borrower.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('borrowers')
@ApiTags('borrowers')
export class BorrowersController {
  constructor(private readonly borrowersService: BorrowersService) {}

  @Post()
  create(@Body() createBorrowerDto: CreateBorrowerDto) {
  return this.borrowersService.create(createBorrowerDto);
 }

  @Get()
  findAll() {
    return this.borrowersService.findAll();
  }

  @Get(':uuid')
  public getByUUID(@Param('uuid') uuid: string) {
    return this.borrowersService.getByUUID(uuid);
  }

  @Patch(':uuid')
  public updateByUUID(
    @Param('uuid') uuid: string,
    @Body() updateBorrowerDto: UpdateBorrowerDto,
  ) {
    return this.borrowersService.updateByUUID(uuid, updateBorrowerDto);
  }

  @Delete(':uuid')
  public deleteByUUID(@Param('uuid') uuid: string) {
    return this.borrowersService.deleteByUUID(uuid);
  }
}
