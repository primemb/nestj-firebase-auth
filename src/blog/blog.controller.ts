import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { UploadImage } from 'src/shared/decorators/upload-image.decorator';
import { ICustomUploadFile } from 'src/shared/interfaces/custom-upload-file.interface';
import { ImageFileValidatorPipe } from 'src/shared/pipe/image-file-validator.pipe';
import { PaginateDto } from 'src/shared/dto/paginate.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Roles } from 'src/auth/enums/roles.enum';

@Controller()
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @Auth(Roles.Admin)
  @UploadImage('image', 'blog_image')
  create(
    @Body() createBlogDto: CreateBlogDto,
    @UploadedFile(new ImageFileValidatorPipe({ storeFolder: 'blog_image' }))
    image: ICustomUploadFile,
  ) {
    return this.blogService.create(createBlogDto, image);
  }

  @Get()
  @Auth(Roles.User)
  findAll(@Query() paginate: PaginateDto) {
    return this.blogService.findAll(paginate);
  }

  @Get(':id')
  @Auth(Roles.User)
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }

  @Patch(':id')
  @Auth(Roles.Admin)
  @UploadImage('image', 'blog_image')
  update(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
    @UploadedFile(
      new ImageFileValidatorPipe({
        storeFolder: 'blog_image',
        isOptional: true,
      }),
    )
    image: ICustomUploadFile,
  ) {
    return this.blogService.update(+id, updateBlogDto, image);
  }

  @Delete(':id')
  @Auth(Roles.Admin)
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
