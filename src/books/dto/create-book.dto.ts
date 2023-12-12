import { IsEmail, IsString, Length, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
    @ApiProperty({  
        description: 'Book title',})
    @Length(1, 40)
    name : string;

    @ApiProperty({
    description: 'Book description',})
    @IsString()
    @Length(1, 500)
    password : string;
}

