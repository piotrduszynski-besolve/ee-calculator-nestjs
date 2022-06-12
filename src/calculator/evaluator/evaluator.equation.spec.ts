import { Test, TestingModule } from '@nestjs/testing';
import { EvaluateEquation } from './evaluator.equation';

describe('EvaluateEquation', () => {
  let service: EvaluateEquation;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EvaluateEquation],
    }).compile();

    service = module.get<EvaluateEquation>(EvaluateEquation);
  });

  it('evaluate should sum integers', () => {
    expect(service.evaluate('2+2')).toStrictEqual(4);
  });

  it('evaluate should sum floating', () => {
    const result = service.evaluate('2.0000000000001+2.0');
    expect(result).toBeLessThanOrEqual(4.0000000000001);
    expect(result).toBeGreaterThanOrEqual(4.00000000000009);
  });

  it('evaluate should minus integers', () => {
    expect(service.evaluate('2-2')).toStrictEqual(0);
  });

  it('evaluate should minus floating', () => {
    const result = service.evaluate('4.0000000000001-2.0');
    expect(result).toBeLessThanOrEqual(2.00000000000011);
    expect(result).toBeGreaterThanOrEqual(2.0000000000001);
  });
});
