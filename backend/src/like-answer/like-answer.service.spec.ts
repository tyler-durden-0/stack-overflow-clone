import { Test, TestingModule } from '@nestjs/testing';
import { LikeAnswerService } from './like-answer.service';

describe('LikeAnswerService', () => {
  let service: LikeAnswerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LikeAnswerService],
    }).compile();

    service = module.get<LikeAnswerService>(LikeAnswerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
