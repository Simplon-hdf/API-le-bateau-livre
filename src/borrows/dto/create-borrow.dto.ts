import { IsInt, IsIn, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBorrowDto {
    @ApiProperty({
        description: 'This field represents the status of borrow',
    })
    @IsInt()
    @IsIn([0, 1, 2])
    status: number;

    end_at: Date;
    
    @ApiProperty({
        description: 'This field represents the UUID of the borrower',
      })
      @Length(36, 36, { message: 'Borrower UUID must be 36 characters long' })
      borrower_UUID: string; // Add this property
}
