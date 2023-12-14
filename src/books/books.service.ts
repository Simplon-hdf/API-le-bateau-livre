import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import NormalizedResponse from 'src/utils/normalized-response';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    if (createBookDto.name.length > 100 || createBookDto.description.length > 500) {
      throw new BadRequestException('Name or description exceeds allowed length');
    }

    try {
      const createdAuthor = await this.prisma.authors.create({
        data: {
          humanInformation: {
            create: {
              first_name: createBookDto.author_first_name,
              last_name: createBookDto.author_last_name,
            },
          },
        },
      });

      const createdBook = new NormalizedResponse(
        `Book ${createBookDto.name} has been created, here is its description: ${createBookDto.description}`,
        await this.prisma.books.create({
          data: {
            name: createBookDto.name,
            description: createBookDto.description,
            author_UUID: createdAuthor.author_UUID,
            borrow_UUID: createBookDto.borrow_UUID,
          },
        }),
      );
      return createdBook.toJSON();
    } catch (error) {
      throw new InternalServerErrorException('Error creating book');
    }
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
