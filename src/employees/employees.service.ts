import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/prisma.service';
import NormalizedResponse from 'src/utils/normalized-response';
import * as bcrypt from 'bcrypt';
import { HumanInformation } from 'src/human-informations/entities/human-information.entity';

@Injectable()
export class EmployeesService {
  private saltGenRound = 12;

  constructor(private readonly prisma: PrismaService) {}

  private async getHumanInformations(HumanInformationUUIDS: string[]) {
    return await this.prisma.humanInformations.findMany({
      where: {
        OR: HumanInformationUUIDS.map((humanInformation) => ({
          humanInformation_UUID: humanInformation,
        })),
      },
    });
  }

  public async create(createEmployeeDto: CreateEmployeeDto) {

    const orderedHumanInformations = await this.getHumanInformations(
      createEmployeeDto.humanInformation_UUID,
    );

    const first_name = orderedHumanInformations.map((HumanInformation) => HumanInformation.first_name);

    const last_name = orderedHumanInformations.map((HumanInformation) => HumanInformation.last_name);

const createdEmployee = new NormalizedResponse(
  `Employee ${createEmployeeDto.mail_address} has been created`,
  await this.prisma.employees.create({
    data: {
      mail_address: createEmployeeDto.mail_address,
      password: await bcrypt.hash(createEmployeeDto.password, this.saltGenRound),
      humanInformations: {
        connect: orderedHumanInformations.map(info => ({ humanInformation_UUID: info.humanInformation_UUID })),
      },
    },
  ),
);
return createdEmployee.toJSON();
}

  findAll() {
    return `This action returns all employees`;
  }

  private async getProducts(productUUIDS: string[]) {
    return await this.prisma.products.findMany({
      where: {
        OR: productUUIDS.map((product) => ({
          UUID: product,
        })),
      },
    });
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
