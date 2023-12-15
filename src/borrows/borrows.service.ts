import { Injectable } from '@nestjs/common';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
import { PrismaService } from 'src/prisma.service';
import NormalizedResponse from 'src/utils/normalized-response';



@Injectable()
export class BorrowsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  public async create(createBorrowDto: CreateBorrowDto) {

    const createdBorrow = new NormalizedResponse(
      `Borrow has been created`,
      await this.prisma.borrows.create({
        data: {
          end_at: new Date(createBorrowDto.end_at),
          status: createBorrowDto.status,
          borrower: {
            connect: {
              borrower_UUID: createBorrowDto.borrower_UUID,
            }
          },
          employee: {
            connect: {
              employee_UUID: createBorrowDto.employee_UUID,
            },
          },
          Books: {
            connect: {
              book_UUID: createBorrowDto.book_UUID,
            }
          },
        },
      }),
    );
    return createdBorrow.toJSON();
  }

  findAll() {
    return `This action returns all borrows`;
  }

  public async getByUUID(uuid: string) {
    try {
      const borrow = await this.prisma.borrows.findUnique({
        where: {
          borrow_UUID: uuid,
        },
        include: {
          borrower: {
            include: {
              humanInformation: {
                select: {
                  first_name: true,
                  last_name: true,
                },
              },
            },
          },
        },
      });
  
      if (!borrow) {
        throw new Error(`Borrow with UUID ${uuid} not found`);
      }
  
      const responseMessage = `Borrow with UUID ${uuid} has been found`;
      const gettedBorrow = new NormalizedResponse(responseMessage, borrow);
      return gettedBorrow.toJSON();
    } catch (error) {
      const errorMessage = `Error while fetching borrow with UUID ${uuid}: ${error.message}`;
      const errorResponse = new NormalizedResponse(errorMessage, null);
      return errorResponse.toJSON();
    }
  }

  public async updateByUUID(uuid: string, updateBorrowDto: UpdateBorrowDto) {
    const updatedBorrow = new NormalizedResponse(
      `Borrow has been updated`,
      await this.prisma.borrows.update({
        where: {
          borrow_UUID: uuid,
        },
        data: {
          end_at: new Date(updateBorrowDto.end_at),
          status: updateBorrowDto.status,
        },
      }),
    );
    return updatedBorrow.toJSON();
  }

  public async deleteByUUID(uuid: string) {
    const deletedBorrow = new NormalizedResponse(
      `Borrow ${uuid} has been deleted`,
      await this.prisma.borrows.delete({
        where: {
          borrow_UUID: uuid,
        },
      }),
    );
    return deletedBorrow.toJSON();
  }
}
