import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorController } from './calculator.controller';
import { EvaluateEquation } from './evaluate/evaluate.equation';

describe('CalculatorController', () => {
  let controller: CalculatorController;
  const expectedEquationResult = 10;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalculatorController],
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.test.env',
        }),
      ],
    })
      .useMocker((token) => {
        if (token === EvaluateEquation) {
          return {
            evaluate: jest.fn().mockReturnValue(expectedEquationResult),
          };
        }
      })
      .compile();

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
        result: expect.any(Number),
      }),
    );
  });

  it('should return branding', () => {
    //given
    const brand = process.env['BRAND_NAME'];
    //when
    const calculatorResults = controller.postCalculation({ equation: '' });
    //then
    expect(calculatorResults).toEqual(
      expect.objectContaining({
        equation: expect.any(String),
        brand,
        result: expect.any(Number),
      }),
    );
  });

  it('should return result', () => {
    //given
    //when
    const calculatorResults = controller.postCalculation({ equation: '' });
    //then
    expect(calculatorResults).toEqual(
      expect.objectContaining({
        equation: expect.any(String),
        brand: expect.any(String),
        result: expectedEquationResult,
      }),
    );
  });
});
