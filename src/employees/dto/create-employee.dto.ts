import { IsEmail, IsString, Length, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
    @ApiProperty({
        description: 'This field represents the employee email',
        minLength: 7,
        maxLength: 80,
      })
    @IsEmail()
    @Length(7, 80)
    mail_address: string;

    @ApiProperty({
        description: 'This field represents the employee password',
        minLength: 1,
        maxLength: 72,
      })
    @IsString()
    @Length(1, 72)
    password: string;



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