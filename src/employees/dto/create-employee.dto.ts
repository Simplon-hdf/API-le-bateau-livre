import { IsEmail, IsString, Length } from 'class-validator';

export class CreateEmployeeDto {
    @IsEmail()
    @Length(7, 80)
    mail_address : string;

    @IsString()
    @Length(72, 72)
    password : string;

    @IsString()
    @Length(3, 20)
    first_name : string;

    @IsString()
    @Length(2, 30)
    last_name : string;
}