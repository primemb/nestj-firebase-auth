import { unlinkSync } from 'fs';
import { join, resolve } from 'path';
import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { DatabaseService } from 'src/database/database.service';
import { ICustomUploadFile } from 'src/shared/interfaces/custom-upload-file.interface';
import { PaginateDto } from 'src/shared/dto/paginate.dto';

@Injectable()
export class BlogService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createBlogDto: CreateBlogDto, image: ICustomUploadFile) {
    const blog = await this.databaseService.blog.create({
      data: {
        ...createBlogDto,
        image: image.storeDestination,
      },
    });

    return blog;
  }

  async findAll(paginate: PaginateDto) {
    const { skip, take } = paginate;
    const count = await this.databaseService.blog.count();
    if (skip !== undefined && take !== undefined) {
      return {
        data: await this.databaseService.blog.findMany({
          skip,
          take,
          orderBy: {
            createdAt: 'desc',
          },
        }),
        count,
      };
    }
    return this.databaseService.blog.findMany();
  }

  async findOne(id: string) {
    const blog = await this.databaseService.blog.findUnique({
      where: {
        id,
      },
    });

    if (!blog) {
      throw new NotFoundException(`Blog with id ${id} not found`);
    }

    return blog;
  }

  async update(
    id: string,
    updateBlogDto: UpdateBlogDto,
    image: ICustomUploadFile,
  ) {
    const oldBlog = await this.findOne(id);

    if (image) {
      this.removeOldImage(oldBlog.image);
    }

    return this.databaseService.blog.update({
      where: {
        id,
      },
      data: {
        ...updateBlogDto,
        image: image ? image.storeDestination : oldBlog.image,
      },
    });
  }

  async remove(id: string) {
    const blog = await this.findOne(id);

    this.removeOldImage(blog.image);

    return this.databaseService.blog.delete({
      where: {
        id,
      },
    });
  }

  private removeOldImage(imagePath: string) {
    try {
      unlinkSync(join(resolve(), 'files', imagePath));
    } catch (error) {
      console.error(error);
      throw new Error('Failed to remove old image');
    }
  }
}
