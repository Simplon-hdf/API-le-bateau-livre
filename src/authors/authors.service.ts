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
    return `This action returns all authors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} author`;
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return `This action updates a #${id} author`;
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}