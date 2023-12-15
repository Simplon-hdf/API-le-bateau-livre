import { IsString, Length, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({
    description: 'Book title',
  })
  @Length(1, 100)
  name: string;

  @ApiProperty({
    description: 'Book description',
  })
  @IsString()
  @Length(1, 500)
  description: string;

  @ApiProperty({
    description: "The book's author's first name",
  })
  @IsString()
  public author_first_name?: string;

  @ApiProperty({
    description: "The book's author's last name",
  })
  @IsString()
  public author_last_name?: string;

  @ApiProperty({
    description: "The book's borrow_UUID (optional)",
    required: false,
})
@IsString()
@IsOptional()
public borrow_UUID?: string;
}
