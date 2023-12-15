import { IsInt, IsIn, IsString, IsUUID, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateBorrowDto {
    
    @IsUUID()
    @ApiProperty()
    borrower_UUID?: string;

    @IsUUID()
    @ApiProperty()
    employee_UUID: string;

    @IsUUID()
    @ApiProperty()
    book_UUID: string;

    @IsInt()
    @ApiProperty()
    status: number;

     @IsDateString()
     @ApiProperty()
     end_at: string;
}

