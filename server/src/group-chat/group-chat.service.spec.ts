import { Test, TestingModule } from '@nestjs/testing';
import { GroupChatService } from './group-chat.service';

describe('GroupChatService', () => {
  let service: GroupChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupChatService],
    }).compile();

    service = module.get<GroupChatService>(GroupChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
