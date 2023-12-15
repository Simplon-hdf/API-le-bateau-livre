import { Injectable } from '@nestjs/common';
import { CreateBorrowerDto } from './dto/create-borrower.dto';
import { UpdateBorrowerDto } from './dto/update-borrower.dto';
import { PrismaService } from 'src/prisma.service';
import NormalizedResponse from 'src/utils/normalized-response';
import { HumanInformationsService } from 'src/human-informations/human-informations.service';


@Injectable()
export class BorrowersService {
  
  constructor(
    private readonly prisma: PrismaService,
    private readonly humanInformationService: HumanInformationsService,
    ) {}

    public async create(createBorrowerDto: CreateBorrowerDto) {
        const createdHumanInformation = await this.humanInformationService.create({
          first_name: createBorrowerDto.first_name,
          last_name: createBorrowerDto.last_name,
        });
    
        const createdBorrower = new NormalizedResponse(
          `Borrower ${createBorrowerDto.first_name} has been created`,
        await this.prisma.borrowers.create({
          data: {
            humanInformation: {
              connect: { 
                humanInformation_UUID: createdHumanInformation.humanInformation_UUID,
              },
            },
          },
        }))
        return createdBorrower.toJSON();
      }
    

  findAll() {
    return `This action returns all borrowers`;
  }

  public async getByUUID(uuid: string) {
    try {
      const borrower = await this.prisma.borrowers.findUnique({
        where: {
          borrower_UUID: uuid,
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
  
      if (!borrower) {
        throw new Error(`borrower with UUID ${uuid} not found`);
      }
  
      const responseMessage = `borrower with UUID ${uuid} has been found`;
      const gettedborrower = new NormalizedResponse(responseMessage, borrower);
      return gettedborrower.toJSON();
    } catch (error) {
      const errorMessage = `Error while fetching borrower with UUID ${uuid}: ${error.message}`;
      const errorResponse = new NormalizedResponse(errorMessage, null);
      return errorResponse.toJSON();
    }
  }

  public async updateByUUID(uuid: string, updateBorrowerDto: UpdateBorrowerDto) {
    const updatedBorrower = new NormalizedResponse(
      `Borrower ${updateBorrowerDto.first_name} has been updated`,
      await this.prisma.borrowers.update({
        where: {
          borrower_UUID: uuid,
        },
        data: {
          humanInformation: {
            update: {
              first_name: updateBorrowerDto.first_name,
              last_name: updateBorrowerDto.last_name,
            },
          },
        },
      }),
    );
    return updatedBorrower.toJSON();
  }
  
  



  public async deleteByUUID(uuid: string) {
    const deletedBorrower = new NormalizedResponse(
      `Borrower ${uuid} has been deleted`,
      await this.prisma.borrowers.delete({
        where: {
          borrower_UUID: uuid,
        },
      }),
    );
    return deletedBorrower.toJSON();
  }
}
