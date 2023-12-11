import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/prisma.service';
import NormalizedResponse from 'src/utils/normalized-response';

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(createEmployeeDto: CreateEmployeeDto) {
    const createdEmployee = new NormalizedResponse(
      `Employee ${createEmployeeDto.first_name} has been created`,
      await this.prisma.employees.create({
      data: {
        mail_address: createEmployeeDto.mail_address,
        password: createEmployeeDto.password,
        first_name: createEmployeeDto.first_name,
        last_name: createEmployeeDto.last_name,

      },
    }),
  );
    return createdEmployee.toJSON;
  }

  findAll() {
    return `This action returns all employees`;
  }

  public async getByUUID(uuid: string) {
    const gettedEmployee = new NormalizedResponse(
      `Employee ${uuid} has been found`,
      await this.prisma.employees.findUnique({
      where: {
        employee_UUID: uuid,
      },
    }),
  );
    return gettedEmployee.toJSON;
  }

  public async updateByUUID(uuid: string, updateEmployeeDto: UpdateEmployeeDto) {
    const updatedEmployee = new NormalizedResponse(
      `Employee ${updateEmployeeDto.first_name} has been updated`,
      await this.prisma.employees.update({
      where: {
        employee_UUID: uuid,
      },
      data: {
        mail_address: !!updateEmployeeDto.mail_address ? updateEmployeeDto.mail_address : undefined,
        password: !!updateEmployeeDto.password ? updateEmployeeDto.password : undefined,
        first_name: !!updateEmployeeDto.first_name ? updateEmployeeDto.first_name : undefined,
        last_name: !!updateEmployeeDto.last_name ? updateEmployeeDto.last_name : undefined,
      },
    }),
  );
    return updatedEmployee.toJSON;
  }

  public async deleteByUUID(uuid: string) {
    const deletedEmployee = new NormalizedResponse(
      `Employee ${uuid} has been deleted`,
      await this.prisma.employees.delete({
      where: {
        employee_UUID: uuid,
      },
    }),
  );
    return deletedEmployee.toJSON;
  }
}
