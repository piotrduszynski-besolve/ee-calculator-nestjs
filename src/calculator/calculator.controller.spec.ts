import { CalculatorService } from './service/calculator/calculator.service';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorController } from './calculator.controller';

describe('CalculatorController', () => {
  let controller: CalculatorController;
  const expectedEquationResult = 10;
  const errorMsg = 'Wrong Equation';
  const body = { equation: '2+2' };
  const wrongBody = { equation: '2+a' };

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
        if (token === CalculatorService) {
          return {
            calculate: jest.fn((equation: string) => {
              if (equation === body.equation) {
                return expectedEquationResult;
              }
              if (equation === wrongBody.equation) {
                throw Error(errorMsg);
              }
            }),
          };
        }
      })
      .compile();

    controller = module.get<CalculatorController>(CalculatorController);
  });

  it('should return equation', () => {
    //given
    const equation = body.equation;
    //when
    const calculatorResults = controller.postCalculation(body);
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
    const calculatorResults = controller.postCalculation(body);
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
    const calculatorResults = controller.postCalculation(body);
    //then
    expect(calculatorResults).toEqual(
      expect.objectContaining({
        equation: expect.any(String),
        brand: expect.any(String),
        result: expectedEquationResult,
      }),
    );
  });

  it('should return error', () => {
    //given
    //when
    const calculatorResults = controller.postCalculation({ equation: '2+a' });
    //then
    expect(calculatorResults).toEqual(
      expect.objectContaining({
        msg: errorMsg,
      }),
    );
  });
});
