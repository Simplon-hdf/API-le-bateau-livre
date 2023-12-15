import { IsString, IsUUID, Length, isString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class CreateHumanInformationDto {
    @ApiProperty({
        description: 'This field represents the human first_name',
        minLength: 5,
        maxLength: 20,
      })
    @IsString()
    @Length(5, 20)
    first_name: string;

    @ApiProperty({
        description: 'This field represents the human last_name',
        minLength: 5,
        maxLength: 30,
      })
    @IsString()
    @Length(5, 30)
    last_name: string;

}