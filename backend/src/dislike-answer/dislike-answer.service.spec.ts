import { Test, TestingModule } from '@nestjs/testing';
import { DislikeAnswerService } from './dislike-answer.service';

describe('LikeAnswerService', () => {
  let service: DislikeAnswerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DislikeAnswerService],
    }).compile();

    service = module.get<DislikeAnswerService>(DislikeAnswerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
