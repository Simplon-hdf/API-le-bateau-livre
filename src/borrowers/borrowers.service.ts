import { Injectable } from '@nestjs/common';
import { CreateBorrowerDto } from './dto/create-borrower.dto';
import { UpdateBorrowerDto } from './dto/update-borrower.dto';
import { PrismaService } from 'src/prisma.service';
import NormalizedResponse from 'src/utils/normalized-response';


@Injectable()
export class BorrowersService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(CreateBorrowerDto: CreateBorrowerDto) {
    const createBorrowerDto = new NormalizedResponse(
      `Employee ${CreateBorrowerDto.first_name} has been created`,
      await this.prisma.employees.create({
      data: {
        first_name: CreateBorrowerDto.first_name,
        last_name: CreateBorrowerDto.last_name,

      },
    }),
  );
    return createBorrowerDto.toJSON;
  }

  findAll() {
    return `This action returns all borrowers`;
  }

  public async getByUUID(uuid: string) {
    const gettedBorrower = new NormalizedResponse(
      `Borrower ${uuid} has been found`,
      await this.prisma.borrowers.findUnique({
      where: {
        borrower_UUID: uuid,
      },
    }),
  );
    return gettedBorrower.toJSON;
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
