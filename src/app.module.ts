import { CalculatorService } from './calculator/service/calculator/calculator.service';
import { EquationStringValidatorService } from './calculator/validator/equation.string.validator.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalculatorController } from './calculator/calculator.controller';
import { EvaluateEquation } from './calculator/evaluator/evaluator.equation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.test.env'],
    }),
  ],
  controllers: [AppController, CalculatorController],
  providers: [
    AppService,
    EvaluateEquation,
    EquationStringValidatorService,
    CalculatorService,
  ],
})
export class AppModule {}
