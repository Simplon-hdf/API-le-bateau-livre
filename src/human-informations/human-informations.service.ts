import { Injectable } from '@nestjs/common';
import { CreateHumanInformationDto } from './dto/create-human-information.dto';
import { UpdateHumanInformationDto } from './dto/update-human-information.dto';
import { PrismaService } from 'src/prisma.service';
import NormalizedResponse from 'src/utils/normalized-response';

@Injectable()
export class HumanInformationsService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(createHumanInformationDto: CreateHumanInformationDto) {
    return await this.prisma.humanInformations.create({
      data: {
        first_name: createHumanInformationDto.first_name,
        last_name: createHumanInformationDto.last_name,
      },
    });
  }

  findAll() {
    return `This action returns all humanInformations`;
  }

  public async getByUUID(uuid: string) {
    const gettedHumanInformation = new NormalizedResponse(
      `HumanInformation ${uuid} has been found`,
      await this.prisma.humanInformations.findUnique({
        where: {
          humanInformation_UUID: uuid,
        },
      }),
    );
    return gettedHumanInformation.toJSON();
  }

  public async updateByUUID(uuid: string, updateHumanInformationDto: UpdateHumanInformationDto) {
    const updatedHumanInformation = new NormalizedResponse(
      `HumanInformation ${updateHumanInformationDto.first_name} has been updated`,
      await this.prisma.humanInformations.update({
        where: {
          humanInformation_UUID: uuid,
        },
        data: {
          first_name: !!updateHumanInformationDto.first_name ? updateHumanInformationDto.first_name : undefined,
          last_name: !!updateHumanInformationDto.last_name ? updateHumanInformationDto.last_name : undefined,
        },
      }),
    );
    return updatedHumanInformation.toJSON();
  }

  public async deleteByUUID(uuid: string) {
    const deletedHumanInformationDto = new NormalizedResponse(
      `HumanInformation ${uuid} has been deleted`,
      await this.prisma.humanInformations.delete({
        where: {
          humanInformation_UUID: uuid,
        },
      }),
    );
    return deletedHumanInformationDto.toJSON();
  }
}

