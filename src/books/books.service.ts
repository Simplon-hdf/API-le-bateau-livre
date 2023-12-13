import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import NormalizedResponse from 'src/utils/normalized-response';
import { PrismaService } from 'src/prisma.service';



@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) { }
  createe(createBookDto: CreateBookDto) {
    return 'This action adds a new book';
  }

  public async create(createBookDto: CreateBookDto) {
    const createdBook = new NormalizedResponse(
      `Book  ${createBookDto.name}has been created`,
      await this.prisma.books.create({
        data: {
          name: createBookDto.name,
          description: createBookDto.description,
          author_UUID: createBookDto.author_UUID,
          borrow_UUID: createBookDto.borrow_UUID

        },
      }),
    );
    return createdBook.toJSON();
  }

  findAll() {
    return `This action returns all books`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
