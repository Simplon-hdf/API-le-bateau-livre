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

  public async updateByUUID(uuid: string, updateEmployeeDto: UpdateEmployeeDto) {
    const updatedEmployee = await this.prisma.employees.update({
      where: {
        UUID: uuid,
      },
      data: {
        mail_address: !!updateEmployeeDto.mail_address ? updateEmployeeDto.mail_address : undefined,
        password: !!updateEmployeeDto.password ? updateEmployeeDto.password : undefined,
        first_name: !!updateEmployeeDto.first_name ? updateEmployeeDto.first_name : undefined,
        last_name: !!updateEmployeeDto.last_name ? updateEmployeeDto.last_name : undefined,
      },
    });
    return updatedEmployee;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
