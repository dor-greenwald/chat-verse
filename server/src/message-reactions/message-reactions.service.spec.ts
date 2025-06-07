import { Test, TestingModule } from '@nestjs/testing';
import { MessageReactionsService } from './message-reactions.service';

describe('MessageReactionsService', () => {
  let service: MessageReactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageReactionsService],
    }).compile();

    service = module.get<MessageReactionsService>(MessageReactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
