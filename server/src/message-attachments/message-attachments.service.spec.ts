import { Test, TestingModule } from '@nestjs/testing';
import { MessageAttachmentsService } from './message-attachments.service';

describe('MessageAttachmentsService', () => {
  let service: MessageAttachmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageAttachmentsService],
    }).compile();

    service = module.get<MessageAttachmentsService>(MessageAttachmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
