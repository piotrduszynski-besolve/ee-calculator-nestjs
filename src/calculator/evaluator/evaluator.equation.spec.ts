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

  it('evaluate should multiple integers', () => {
    expect(service.evaluate('2*2')).toStrictEqual(4);
  });

  it('evaluate should multiple floats', () => {
    const result = service.evaluate('4.0000000000001*2.0');
    expect(result).toBeLessThanOrEqual(8.0000000000002);
    expect(result).toBeGreaterThanOrEqual(8.0000000000001);
  });

  it('evaluate should divide integers', () => {
    expect(service.evaluate('2/2')).toStrictEqual(1);
  });

  it('evaluate should floats integers', () => {
    expect(service.evaluate('2.0/2.0')).toStrictEqual(1);
  });

  it('evaluate should consider operations order', () => {
    expect(service.evaluate('2+2*2')).toStrictEqual(6);
  });

  it('evaluate should not divide by 0', () => {
    expect(service.evaluate('2/0')).toBe(Infinity);
  });
});
