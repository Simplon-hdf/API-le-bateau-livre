import { IsEmail, IsString, Length, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
    @ApiProperty({
        description: 'Book title',})
    @IsEmail()
    @Length(1, 40)
    name: string;

    @ApiProperty({
        description: 'Book description',})
    @IsString()
    @Length(1, 500)
    description: string;


    @ApiProperty({
        description: "The book's author_UUID",})
    @IsString()
    public author_UUID: string;

    @ApiProperty({
        description: "The book's borrow_UUID",})
    @IsString()
    public borrow_UUID: string;
}


