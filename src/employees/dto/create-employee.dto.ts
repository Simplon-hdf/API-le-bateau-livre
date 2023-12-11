import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
    @ApiProperty({
        description: 'This field represents the employee email',
        minLength: 7,
        maxLength: 80,
      })
    @IsEmail()
    @Length(7, 80)
    mail_address : string;

    @ApiProperty({
        description: 'This field represents the employee password',
        minLength: 72,
        maxLength: 72,
      })
    @IsString()
    @Length(72, 72)
    password : string;

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