import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(createEmployeeDto: CreateEmployeeDto) {
    const createdEmployee = await this.prisma.employees.create({
      data: {
        mail_address: createEmployeeDto.mail_address,
        password: createEmployeeDto.password,
        first_name: createEmployeeDto.first_name,
        last_name: createEmployeeDto.last_name,

      },
    });
    return createdEmployee;
  }

  findAll() {
    return `This action returns all employees`;
  }

  public async getByUUID(uuid: string) {
    const gettedEmployee = await this.prisma.employees.findUnique({
      where: {
        UUID: uuid,
      },
    });
    return gettedEmployee;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
