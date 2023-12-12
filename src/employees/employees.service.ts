import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/prisma.service';
import NormalizedResponse from 'src/utils/normalized-response';
import * as bcrypt from 'bcrypt';
import { HumanInformationsService } from 'src/human-informations/human-informations.service';

@Injectable()
export class EmployeesService {
  private saltGenRound = 12;

  constructor(
    private readonly prisma: PrismaService,
    private readonly humanInformationService: HumanInformationsService,
    ) {}


    public async create(createEmployeeDto: CreateEmployeeDto) {

      const createdHumanInformation = await this.humanInformationService.create({
        first_name: createEmployeeDto.first_name,
        last_name: createEmployeeDto.last_name,
      });

  const hashedPassword = await bcrypt.hash(createEmployeeDto.password, this.saltGenRound);

  const createdEmployee = new NormalizedResponse(
    `Employee with email ${createEmployeeDto.mail_address} has been created`,
    await this.prisma.employees.create({
      data: {
        mail_address: createEmployeeDto.mail_address,
        password: hashedPassword,
        humanInformation: {
          connect: { 
            humanInformation_UUID: createdHumanInformation.humanInformation_UUID,
          },
        },
      },
    }),
  );

  return createdEmployee.toJSON();
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
        include: {
          humanInformation: {
            select: {
              first_name: true,
              last_name: true,
            }
          }
        }
      }),
    );
    return gettedEmployee.toJSON();
  }

  public async updateByUUID(uuid: string, updateEmployeeDto: UpdateEmployeeDto) {
    const updatedEmployee = new NormalizedResponse(
      `Employee with this ${updateEmployeeDto.mail_address} has been updated`,
      await this.prisma.employees.update({
        where: {
          employee_UUID: uuid,
        },
        data: {
          mail_address: !!updateEmployeeDto.mail_address ? updateEmployeeDto.mail_address : undefined,
          password: !!await bcrypt.hash(updateEmployeeDto.password, this.saltGenRound) ? await bcrypt.hash(updateEmployeeDto.password, this.saltGenRound) : undefined,
        },
      }),
    );
    return updatedEmployee.toJSON();
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
    return deletedEmployee.toJSON();
  }
}
