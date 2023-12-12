import { Injectable } from '@nestjs/common';
import { CreateBorrowerDto } from './dto/create-borrower.dto';
import { UpdateBorrowerDto } from './dto/update-borrower.dto';
import { PrismaService } from 'src/prisma.service';
import NormalizedResponse from 'src/utils/normalized-response';


@Injectable()
export class BorrowersService {
  
  constructor(private readonly prisma: PrismaService) {}

//  public async create(CreateBorrowerDto: CreateBorrowerDto) {
//    const createBorrowerDto = new NormalizedResponse(
//      `Borrower ${CreateBorrowerDto.humanInformation_UUID} has been created`,
//      await this.prisma.employees.create({
//      data: {
//        humanInformation: {
//          connect: { 
//            humanInformation_UUID: CreateBorrowerDto.humanInformation_UUID,
//          }
//      },
//    }}),
//  );
//    return createBorrowerDto.toJSON;
//  }

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
