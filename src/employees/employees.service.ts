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
        `Employee with email ${createEmployeeDto.first_name} has been created`,
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
    try {
      const employee = await this.prisma.employees.findUnique({
        where: {
          employee_UUID: uuid,
        },
        include: {
          humanInformation: {
            select: {
              first_name: true,
              last_name: true,
            },
          },
        },
      });
  
      if (!employee) {
        throw new Error(`Employee with UUID ${uuid} not found`);
      }
  
      const responseMessage = `Employee with UUID ${uuid} has been found`;
      const gettedEmployee = new NormalizedResponse(responseMessage, employee);
      return gettedEmployee.toJSON();
    } catch (error) {
      const errorMessage = `Error while fetching employee with UUID ${uuid}: ${error.message}`;
      const errorResponse = new NormalizedResponse(errorMessage, null);
      return errorResponse.toJSON();
    }
  }
  

  public async updateByUUID(uuid: string, updateEmployeeDto: UpdateEmployeeDto) {
    const updatedEmployee = new NormalizedResponse(
      `Employee with this new email ${updateEmployeeDto.mail_address} has been updated`,
      await this.prisma.employees.update({
        where: {
          employee_UUID: uuid,
        },
        data: {
          mail_address: !!updateEmployeeDto.mail_address ? updateEmployeeDto.mail_address : undefined,
          password: !!updateEmployeeDto.password ? await bcrypt.hash(updateEmployeeDto.password, this.saltGenRound) : undefined,
          humanInformation: {
            update: {
              first_name: !!updateEmployeeDto.first_name ? updateEmployeeDto.first_name : undefined,
              last_name: !!updateEmployeeDto.last_name ? updateEmployeeDto.last_name : undefined,
        },
      }
    }
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
