import { Test, TestingModule } from '@nestjs/testing';
import { LikeQuestionService } from './like-question.service';

describe('LikeQuestionService', () => {
  let service: LikeQuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LikeQuestionService],
    }).compile();

    service = module.get<LikeQuestionService>(LikeQuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
