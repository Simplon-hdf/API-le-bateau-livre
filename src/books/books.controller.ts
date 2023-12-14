import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':book_UUID')
  findOne(@Param('book_UUID') book_UUID: string) {
    return this.booksService.findOne(book_UUID);
  }

  @Patch(':book_UUID')
  update(@Param('book_UUID') book_UUID: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(book_UUID, updateBookDto);
  }

  @Delete(':book_UUID') 
  remove(@Param('book_UUID') book_UUID: string) {
    return this.booksService.remove(book_UUID);
  }
}
