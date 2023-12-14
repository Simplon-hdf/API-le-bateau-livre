import { Injectable } from '@nestjs/common';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
import { PrismaService } from 'src/prisma.service';
import NormalizedResponse from 'src/utils/normalized-response';
import { EmployeesService } from 'src/employees/employees.service';
import { BorrowersService } from 'src/borrowers/borrowers.service';


@Injectable()
export class BorrowsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly employeesService : EmployeesService,
    private readonly borrowersService : BorrowersService,
  ) {}

 // public async create(createBorrowDto: CreateBorrowDto) {
 //   const createdBorrow = new NormalizedResponse(
 //     `Borrow has been created`,
 //     await this.prisma.borrows.create({
//        data: {
//          status: createBorrowDto.status,
//          end_at: createBorrowDto.end_at,
  //        borrower: {
    //        connect: {
      //        borrower_UUID: createBorrowDto.borrower_UUID,
        //    },
          //},
   //     },
   //   }),
   // );
  
  //  return createdBorrow.toJSON();
//  }
  

  findAll() {
    return `This action returns all borrows`;
  }

  findOne(id: number) {
    return `This action returns a #${id} borrow`;
  }

  update(id: number, updateBorrowDto: UpdateBorrowDto) {
    return `This action updates a #${id} borrow`;
  }

  remove(id: number) {
    return `This action removes a #${id} borrow`;
  }
}
