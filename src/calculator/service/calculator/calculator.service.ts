import { EvaluateEquation } from './../../evaluator/evaluator.equation';
import { EquationStringValidatorService } from './../../validator/equation.string.validator.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculatorService {
  constructor(
    private equationValidator: EquationStringValidatorService,
    private evaluateEquation: EvaluateEquation,
  ) {}

  calculate(equation: string): number {
    if (this.equationValidator.validate(equation)) {
      const result = this.evaluateEquation.evaluate(equation);
      if (result !== Infinity) {
        return result;
      }
    }
    throw Error('Wrong Equation: ' + equation);
  }
}
