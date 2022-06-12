import { EquationStringValidatorService } from './../../validator/equation.string.validator.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorService } from './calculator.service';
import { EvaluateEquation } from './../../evaluator/evaluator.equation';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<unknown>;
};
const equation = '2+2';
const badEquation = '2+a';

const validatorMockFactory: () => MockType<EquationStringValidatorService> =
  jest.fn(() => ({
    validate: jest.fn((str: string) => {
      if (str === equation) return true;
      if (str === badEquation) return false;
    }),
  }));

const evaluatorMockFactory: () => MockType<EvaluateEquation> = jest.fn(() => ({
  evaluate: jest.fn((str: string) => 5),
}));

describe('CalculatorService', () => {
  let service: CalculatorService;
  let equationValidator: EquationStringValidatorService;
  let equationEvaluator: EvaluateEquation;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CalculatorService,
        {
          provide: EquationStringValidatorService,
          useFactory: validatorMockFactory,
        },
        {
          provide: EvaluateEquation,
          useFactory: evaluatorMockFactory,
        },
      ],
    }).compile();

    service = module.get<CalculatorService>(CalculatorService);
    equationValidator = module.get<EquationStringValidatorService>(
      EquationStringValidatorService,
    );
    equationEvaluator = module.get<EvaluateEquation>(EvaluateEquation);
  });

  it('should calculate an equation', () => {
    //given
    //when
    const result = service.calculate(equation);
    //then
    expect(equationValidator.validate).toHaveBeenCalled();
    expect(equationEvaluator.evaluate).toHaveBeenCalledWith(equation);
    expect(result).toBe(5);
  });

  it('should calculate throw an error when wrong equation', () => {
    //given
    //when
    //then
    expect(() => {
      service.calculate(badEquation);
    }).toThrow('Wrong Equation: 2+a');
  });
});
