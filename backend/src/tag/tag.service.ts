import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private tagsRepository: Repository<Tag>) {}

  async create(createTagDto: CreateTagDto) {
    try {
      const newTagEntity: Tag = this.tagsRepository.create({ ...createTagDto })
      return this.tagsRepository.save(newTagEntity);
    } catch(err) {
      throw err;
    }
  }

  async findAllTags(): Promise<Tag[]> {
    return this.tagsRepository.find();
  }

  async findTagById(tagId: number): Promise<Tag> {
    return this.tagsRepository.findOneBy({id: tagId});
  }

  async findTagByName(name: string): Promise<Tag> {
    return this.tagsRepository.findOne({where: {name}});
  }

  async findExistingTagsByArrayOfTheirNames(names: string[]): Promise<Tag[]> {
    const existingTags: Tag[] = [];

    for (const name of names) {
      const result = await this.findTagByName(name);
      if (result !== null) {
        existingTags.push(result);
      }
    }

    return existingTags;
  }

  async update(updateTagDto: Partial<UpdateTagDto> & { tagId: number}): Promise<boolean> {
    try {
      const updatedTag: UpdateResult = await this.tagsRepository.update(updateTagDto.tagId, {name: updateTagDto?.newName, description: updateTagDto?.newDescription});
      return updatedTag.affected > 0;
    } catch(err) {
      throw err;
    }
  }

  async remove(id: number) {
    try {
      const deleteResult: DeleteResult = await this.tagsRepository.delete({id});
      return deleteResult.affected > 0;
    } catch(err) {
      throw err;
    }
  }
}
