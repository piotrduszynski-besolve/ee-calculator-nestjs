import { ConfigService } from '@nestjs/config';
import { CalculatorResults } from './types/calculator.results.interface';
import { CalculatorInput } from './types/calculator.input.interface';
import { Body, Controller, Post } from '@nestjs/common';
import { EvaluateEquation } from './evaluate/evaluate.equation';

@Controller('calculator')
export class CalculatorController {
  constructor(
    private configService: ConfigService,
    private evaluateEquation: EvaluateEquation,
  ) {}

  @Post()
  postCalculation(@Body() calculatorInput: CalculatorInput): CalculatorResults {
    return {
      equation: calculatorInput.equation,
      brand: this.configService.get<string>('BRAND_NAME'),
      result: this.evaluateEquation.evaluate(calculatorInput.equation),
    };
  }
}
