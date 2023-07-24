import { Controller, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Role, Roles, RolesGuard } from 'src/auth/roles';
import { AuthGuard } from 'src/auth/guard';
import { Tag } from './entities/tag.entity';
import { DeleteTagDto } from './dto/delete-tag.dto';

@Controller('tag')
@Roles(Role.admin)
@UseGuards(AuthGuard, RolesGuard)
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  async create(@Body() createTagDto: CreateTagDto): Promise<Tag> {
    try {
      const tagEntity: Tag = await this.tagService.findTagByName(createTagDto.name);

      if (!tagEntity) {

        return await this.tagService.create({ ...createTagDto });
      } else {
        throw new HttpException('Tag already exists', HttpStatus.BAD_REQUEST);
      }
    } catch(err) {
      throw err;
    }
  }

  @Patch()
  async update(@Body() updateTagDto: UpdateTagDto): Promise<object> {
    try {
      const isTagAlreadyExists: Tag = await this.tagService.findTagByName(updateTagDto.name);

      console.log('isTagAlreadyExists', isTagAlreadyExists)

      if (isTagAlreadyExists) {
        const isUpdated: boolean = await this.tagService.update({...updateTagDto, tagId: isTagAlreadyExists.id});
        return {success: isUpdated};
      } else {
        throw new HttpException('Tag do not exists', HttpStatus.BAD_REQUEST);
      }
    } catch(err) {
      throw err;
    }
  }

  @Delete()
  async remove(@Body() deleteTagDto: DeleteTagDto): Promise<object> {
    try {
      const isTagAlreadyExists: Tag = await this.tagService.findTagByName(deleteTagDto.name);

      if (isTagAlreadyExists) {
        const isRomoved: boolean = await this.tagService.remove(isTagAlreadyExists.id);
        return {success: isRomoved};
      } else {
        throw new HttpException('Tag do not exists', HttpStatus.BAD_REQUEST);
      }
    } catch(err) {
      throw err;
    }
  }
}
