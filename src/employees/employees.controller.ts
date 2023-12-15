import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('employees')
@ApiTags('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(':uuid')
  public getByUUID(@Param('uuid') uuid: string) {
    return this.employeesService.getByUUID(uuid);
  }


  @Patch(':uuid')
  public updateByUUID(
    @Param('uuid') uuid: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.updateByUUID(uuid, updateEmployeeDto);
  }

  @Delete(':uuid')
  public deleteByUUID(@Param('uuid') uuid: string) {
    return this.employeesService.deleteByUUID(uuid);
  }
}
