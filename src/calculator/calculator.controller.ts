import { CalculatorResults } from './types/calculator.results.interface';
import { CalculatorInput } from './types/calculator.input.interface';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('calculator')
export class CalculatorController {
  @Post()
  postCalculation(@Body() calculatorInput: CalculatorInput): CalculatorResults {
    return { equation: calculatorInput.equation };
  }
}
