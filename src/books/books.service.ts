
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import NormalizedResponse from 'src/utils/normalized-response';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    const createdBook = new NormalizedResponse(
      `Book ${createBookDto.name} has been created, here is its description : ${createBookDto.description}`,
      await this.prisma.books.create({
        data: {
          name: createBookDto.name,
          description: createBookDto.description,
          author_UUID: createBookDto.author_UUID,
          borrow_UUID: createBookDto.borrow_UUID,
        },
      }),
    );
    return createdBook.toJSON();
  }

  async findAll() {
    const books = await this.prisma.books.findMany();
    return books.map((book) => ({
      book_UUID: book.book_UUID,
      name: book.name,
      description: book.description,
      author_UUID: book.author_UUID,
      borrow_UUID: book.borrow_UUID,
    }));
  }

  async findOne(book_UUID: string) {
    const book = await this.prisma.books.findUnique({
      where: { book_UUID },
    });

    if (!book) {
      throw new NotFoundException(`Book with UUID ${book_UUID} not found`);
    }

    return {
      book_UUID: book.book_UUID,
      name: book.name,
      description: book.description,
      author_UUID: book.author_UUID,
      borrow_UUID: book.borrow_UUID,
    };
  }

  async update(book_UUID: string, updateBookDto: UpdateBookDto) {
    const updatedBook = new NormalizedResponse(
      `Book with UUID ${book_UUID} has been updated`,
      await this.prisma.books.update({
        where: { book_UUID },
        data: updateBookDto,
      }),
    );
    return updatedBook.toJSON();
  }

  async remove(book_UUID: string) {
    const deletedBook = new NormalizedResponse(
      `Book with UUID ${book_UUID} has been deleted`,
      await this.prisma.books.delete({
        where: { book_UUID },
      }),
    );
    return deletedBook.toJSON();
  }
}
