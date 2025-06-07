import { Test, TestingModule } from '@nestjs/testing';
import { MessageReactionsController } from './message-reactions.controller';

describe('MessageReactionsController', () => {
  let controller: MessageReactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageReactionsController],
    }).compile();

    controller = module.get<MessageReactionsController>(MessageReactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
