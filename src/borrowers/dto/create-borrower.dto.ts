import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBorrowerDto {
    @ApiProperty({
        description: 'This field represents the employee first name',
      })
    @IsString()
    first_name: string;

    @ApiProperty({
        description: 'This field represents the employee last name',
      })
    @IsString()
    last_name: string;
}
