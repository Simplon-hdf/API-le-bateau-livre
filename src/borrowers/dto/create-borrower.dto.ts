import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBorrowerDto {

    @ApiProperty({
        description: 'This field represents the employee first name',
        minLength: 3,
        maxLength: 20,
      })
    @IsString()
    @Length(3, 20)
    first_name : string;

    @ApiProperty({
        description: 'This field represents the employee last name',
        minLength: 2,
        maxLength: 30,
      })
    @IsString()
    @Length(2, 30)
    last_name : string;
}
