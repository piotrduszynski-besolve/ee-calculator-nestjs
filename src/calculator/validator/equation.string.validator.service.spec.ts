import { Test, TestingModule } from '@nestjs/testing';
import { EquationStringValidatorService } from './equation.string.validator.service';

describe('EquationStringValidatorService', () => {
  let service: EquationStringValidatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquationStringValidatorService],
    }).compile();

    service = module.get<EquationStringValidatorService>(
      EquationStringValidatorService,
    );
  });

  it.each(['2+2-2', '2.0+2.0-2.0'])(
    'should validate equation that contains basic integer operations for %p',
    (correctEquation: string) => {
      //given
      //when
      const isCorrectEquation = service.validate(correctEquation);
      expect(isCorrectEquation).toBeTruthy();
    },
  );

  it.each([
    '',
    '2++2-2',
    '2+2--2',
    'a+f-2',
    '.0+2.0-2.0',
    '0.+2.0-2.0',
    '2*2',
    '2/2',
    '(2+2)*2',
    '-2+3',
  ])(
    'should not validate equation that contains basic integer operations for %p',
    (correctEquation: string) => {
      //given
      //when
      const isCorrectEquation = service.validate(correctEquation);
      expect(isCorrectEquation).toBeFalsy();
    },
  );
});
