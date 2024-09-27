import { describe, expect, it, vi } from 'vitest';
import { 
  formatSeconds, 
  formatSecondsWithSign, 
  getProgressColorClass, 
  normalizeSelectValue, 
  id 
} from '../src/functions';
import { ProgressColorClass } from '../src/types';
import { 
  HUNDRED_PERCENT, 
  LOW_PERCENT, 
  MEDIUM_PERCENT, 
  SECONDS_IN_DAY,
  SECONDS_IN_HOUR,
  SECONDS_IN_MINUTE 
} from '../src/constants';

describe('format seconds', () => {
  it('v1', () => {
    const formattedSeconds = formatSeconds(SECONDS_IN_MINUTE * 0);

    expect(formattedSeconds).toBe('00:00:00');
  });

  it('v2', () => {
    const formattedSeconds = formatSeconds(SECONDS_IN_MINUTE * 1);
    
    expect(formattedSeconds).toBe('00:01:00');
  });

  it('v3', () => {
    const formattedSeconds = formatSeconds(SECONDS_IN_HOUR * 1);
        
    expect(formattedSeconds).toBe('01:00:00');
  });

  it('v4', () => {
    const formattedSeconds = formatSeconds(SECONDS_IN_DAY * 1);
            
    expect(formattedSeconds).toBe('00:00:00');
  });
});

describe('format seconds with sign', () => {
  it('v1', () => {
    const formattedSecondsWithSign = formatSecondsWithSign(SECONDS_IN_MINUTE * 0);

    expect(formattedSecondsWithSign).toBe('+00:00:00');
  });

  it('v2', () => {
    const formattedSecondsWithSign = formatSecondsWithSign(-SECONDS_IN_MINUTE * 0);
        
    expect(formattedSecondsWithSign).toBe('+00:00:00');
  });

  it('v3', () => {
    const formattedSecondsWithSign = formatSecondsWithSign(SECONDS_IN_MINUTE * 1);
                
    expect(formattedSecondsWithSign).toBe('+00:01:00');
  });

  it('v4', () => {
    const formattedSecondsWithSign = formatSecondsWithSign(-SECONDS_IN_MINUTE * 1);
                        
    expect(formattedSecondsWithSign).toBe('-00:01:00');
  });

  it('v5', () => {
    const formattedSecondsWithSign = formatSecondsWithSign(SECONDS_IN_HOUR * 1);
                                
    expect(formattedSecondsWithSign).toBe('+01:00:00');
  });

  it('v6', () => {
    const formattedSecondsWithSign = formatSecondsWithSign(-SECONDS_IN_HOUR * 1);
                                        
    expect(formattedSecondsWithSign).toBe('-01:00:00');
  });

  it('v7', () => {
    const formattedSecondsWithSign = formatSecondsWithSign(SECONDS_IN_DAY * 1);
                                                
    expect(formattedSecondsWithSign).toBe('+00:00:00');
  });

  it('v8', () => {
    const formattedSecondsWithSign = formatSecondsWithSign(-SECONDS_IN_DAY * 1);
                                                        
    expect(formattedSecondsWithSign).toBe('-00:00:00');
  });
});

describe('normalize select value', () => {
  it('v1', () => {
    const normalizedSelectValue = normalizeSelectValue(null);
    
    expect(normalizedSelectValue).toBe(null);
  });

  it('v2', () => {
    const normalizedSelectValue = normalizeSelectValue('string');

    expect(normalizedSelectValue).toBe('string');
  });

  it('v3', () => {
    const normalizedSelectValue = normalizeSelectValue('1');
    
    expect(normalizedSelectValue).toBe(1);
  });

  it('v4', () => {
    const normalizedSelectValue = normalizeSelectValue('-1');
                    
    expect(normalizedSelectValue).toBe(-1);
  });

  it('v5', () => {
    const normalizedSelectValue = normalizeSelectValue('1.5string');
                            
    expect(normalizedSelectValue).toBe('1.5string');
  });
});

describe('get progress color class', () => {
  it('v1', () => {
    const progressColor = getProgressColorClass(0);

    expect(progressColor).toBe(ProgressColorClass.RED);
  });

  it('v2', () => {
    const progressColor = getProgressColorClass(LOW_PERCENT - 1);
    
    expect(progressColor).toBe(ProgressColorClass.RED);
  });

  it('v3', () => {
    const progressColor = getProgressColorClass(MEDIUM_PERCENT - 1);
        
    expect(progressColor).toBe(ProgressColorClass.YELLOW);
  });

  it('v4', () => {
    const progressColor = getProgressColorClass(HUNDRED_PERCENT - 1);
            
    expect(progressColor).toBe(ProgressColorClass.BLUE);
  });

  it('v5', () => {
    const progressColor = getProgressColorClass(HUNDRED_PERCENT);
                    
    expect(progressColor).toBe(ProgressColorClass.GREEN);
  });
});

describe('id', () => {
  it('v1', () => {
    vi.spyOn(Date, 'now').mockReturnValueOnce(0);
    vi.spyOn(Math, 'random').mockReturnValueOnce(10000);
    const idTest = id();

    expect(idTest).toBe('0s');
  });
});