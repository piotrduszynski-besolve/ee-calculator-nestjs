import { Injectable } from '@nestjs/common';
import * as math from 'mathjs';

@Injectable()
export class EvaluateEquation {
  evaluate(equation: string): number {
    return math.evaluate(equation);
  }
}
