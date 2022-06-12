import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorController } from './calculator.controller';

describe('CalculatorController', () => {
  let controller: CalculatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalculatorController],
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.test.env',
        }),
      ],
    }).compile();

    controller = module.get<CalculatorController>(CalculatorController);
  });

  it('should return equation', () => {
    //given
    const equation = '2+2';
    //when
    const calculatorResults = controller.postCalculation({ equation });
    //then
    expect(calculatorResults).toEqual(
      expect.objectContaining({
        equation,
        brand: expect.any(String),
      }),
    );
  });

  it('should return branding', () => {
    //given
    const brand = process.env['BRAND_NAME'];
    //when
    const calculatorResults = controller.postCalculation({ equation: '' });
    //then
    expect(calculatorResults).toMatchObject({
      equation: '',
      brand,
    });
  });
});
