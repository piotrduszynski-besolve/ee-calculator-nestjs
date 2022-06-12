import { CalculatorService } from './service/calculator/calculator.service';
import { ConfigService } from '@nestjs/config';
import { CalculatorResults } from './types/calculator.results.interface';
import { CalculatorInput } from './types/calculator.input.interface';
import { Body, Controller, Post } from '@nestjs/common';
import { EvaluateEquation as EvaluatorEquation } from './evaluator/evaluator.equation';
import { ErrorResults } from './types/calculator.error.interface';

@Controller('calculator')
export class CalculatorController {
  constructor(
    private configService: ConfigService,
    private calculatorService: CalculatorService,
  ) {}

  @Post()
  postCalculation(
    @Body() calculatorInput: CalculatorInput,
  ): CalculatorResults | ErrorResults {
    try {
      return {
        equation: calculatorInput.equation,
        brand: this.configService.get<string>('BRAND_NAME'),
        result: this.calculatorService.calculate(calculatorInput.equation),
      };
    } catch (e) {
      return {
        msg: e.message ? e.message : 'Generic error',
      };
    }
  }
}
