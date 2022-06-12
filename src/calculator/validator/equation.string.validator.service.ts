import { Injectable } from '@nestjs/common';

const floatNumberRegex = /^([0-9](\.[0-9]+)?|[0-9]+)$/;

@Injectable()
export class EquationStringValidatorService {
  validate(stringEquation: string): boolean {
    return stringEquation
      .split(/[*,\/,+,-]/)
      .every((splittedStr) => floatNumberRegex.test(splittedStr));
  }
}
