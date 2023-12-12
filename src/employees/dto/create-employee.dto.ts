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

    public humanInformation_UUID : string[];


}