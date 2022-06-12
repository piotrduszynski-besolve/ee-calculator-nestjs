import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalculatorController } from './calculator/calculator.controller';
import { EvaluateEquation } from './calculator/evaluate/evaluate.equation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.test.env'],
    }),
  ],
  controllers: [AppController, CalculatorController],
  providers: [AppService, EvaluateEquation],
})
export class AppModule {}
