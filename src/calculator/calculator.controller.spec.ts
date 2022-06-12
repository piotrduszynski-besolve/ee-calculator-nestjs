import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorController } from './calculator.controller';

describe('CalculatorController', () => {
  let controller: CalculatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalculatorController],
    }).compile();

    controller = module.get<CalculatorController>(CalculatorController);
  });

  it('should return equation', () => {
    expect(controller.postCalculation({ equation: '2+2' })).toMatchObject({
      equation: '2+2',
    });
  });
});
