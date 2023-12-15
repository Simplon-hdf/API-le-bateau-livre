import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaService } from 'src/prisma.service';
import NormalizedResponse from 'src/utils/normalized-response';
import { HumanInformationsService } from 'src/human-informations/human-informations.service';


@Injectable()
export class AuthorsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly humanInformationService: HumanInformationsService,
  ) { }



  public async create(createAuthorDto: CreateAuthorDto) {
    const createdHumanInformation = await this.humanInformationService.create({
      first_name: createAuthorDto.first_name,
      last_name: createAuthorDto.last_name
    });


    const createdAuthor = new NormalizedResponse(
      `Author with name ${createAuthorDto.last_name} ${createAuthorDto.first_name} has been created`,
      await this.prisma.authors.create({
        data: {
          humanInformation: {
            connect: {
              humanInformation_UUID: createdHumanInformation.humanInformation_UUID,
            },
          },
        },
      }),
    );
    return createdAuthor.toJSON();
  }

  findAll() {
    return this.prisma.authors.findMany({
      include: {
        humanInformation: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
      },
    });
  }


  public async getByUUID(uuid: string) {
    try {
      const author = await this.prisma.authors.findUnique({
        where: {
          author_UUID: uuid,
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

      if (!author) {
        throw new Error(`Author with UUID ${uuid} not found`);
      }

      const responseMessage = `Author with UUID ${uuid} has been found`;
      const gettedauthor = new NormalizedResponse(responseMessage, author);
      return gettedauthor.toJSON();
    } catch (error) {
      const errorMessage = `Error while fetching author with UUID ${uuid}: ${error.message}`;
      const errorResponse = new NormalizedResponse(errorMessage, null);
      return errorResponse.toJSON();
    }
  }

  public async updateByUUID(uuid: string, updateAuthorDto: UpdateAuthorDto) {
    const updatedAuthor = new NormalizedResponse(
      `Author ${updateAuthorDto.first_name} has been updated`,
      await this.prisma.authors.update({
        where: {
          author_UUID: uuid,
        },
        data: {
          humanInformation: {
            update: {
              first_name: updateAuthorDto.first_name,
              last_name: updateAuthorDto.last_name,
            },
          },
        },
      }),
    );
    return updatedAuthor.toJSON();
  }

  public async deleteByUUID(uuid: string) {
    const deletedAuthor = new NormalizedResponse(
      `Author ${uuid} has been deleted`,
      await this.prisma.authors.delete({
        where: {
          author_UUID: uuid,
        },
      }),
    );
    return deletedAuthor.toJSON();
  }
}
