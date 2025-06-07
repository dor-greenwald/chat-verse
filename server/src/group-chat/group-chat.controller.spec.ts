import { Test, TestingModule } from '@nestjs/testing';
import { GroupChatController } from './group-chat.controller';

describe('GroupChatController', () => {
  let controller: GroupChatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupChatController],
    }).compile();

    controller = module.get<GroupChatController>(GroupChatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
