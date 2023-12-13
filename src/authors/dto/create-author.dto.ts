import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsUUID, MaxLength  } from 'class-validator';

export class CreateAuthorDto {

    @ApiProperty({
        description: 'This field represents the authors first name',
      })
    @IsString()
    first_name: string;

    @ApiProperty({
        description: 'This field represents the authors last name',
      })
    @IsString()
    last_name: string;
}
