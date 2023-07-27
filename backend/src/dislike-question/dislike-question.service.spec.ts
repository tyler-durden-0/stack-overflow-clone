import { Test, TestingModule } from '@nestjs/testing';
import { DislikeQuestionService } from './dislike-question.service';

describe('LikeQuestionService', () => {
  let service: DislikeQuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DislikeQuestionService],
    }).compile();

    service = module.get<DislikeQuestionService>(DislikeQuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
