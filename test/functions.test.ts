import { describe, expect, it, vi } from 'vitest';
import { formatSeconds, formatSecondsWithSign, getProgressColorClass, normalizeSelectValue, id } from '../src/functions';
import { ProgressColorClass } from '../src/types';
import { HUNDRED_PERCENT, LOW_PERCENT, MEDIUM_PERCENT } from '../src/constants';

describe.skip('format seconds', () => {
  it('v1', () => {
    const formattedSeconds = formatSeconds(0);

    expect(formattedSeconds).toBe('00:00:00');
  });

  it('v2', () => {
    const formattedSeconds = formatSeconds(60);
    
    expect(formattedSeconds).toBe('00:01:00');
  });

  it('v3', () => {
    const formattedSeconds = formatSeconds(3600);
        
    expect(formattedSeconds).toBe('01:00:00');
  });

  it('v4', () => {
    const formattedSeconds = formatSeconds(86400);
            
    expect(formattedSeconds).toBe('00:00:00');
  });
});

describe.skip('format seconds with sign', () => {
  it('v1', () => {
    const formattedSecondsWithSign = formatSecondsWithSign(0);

    expect(formattedSecondsWithSign).toBe('+00:00:00');
  });

  it('v2', () => {
    const formattedSecondsWithSign = formatSecondsWithSign(-0);
        
    expect(formattedSecondsWithSign).toBe('+00:00:00');
  });

  it('v3', () => {
    const formattedSecondsWithSign = formatSecondsWithSign(60);
                
    expect(formattedSecondsWithSign).toBe('+00:01:00');
  });

  it('v4', () => {
    const formattedSecondsWithSign = formatSecondsWithSign(-60);
                        
    expect(formattedSecondsWithSign).toBe('-00:01:00');
  });

  it('v5', () => {
    const formattedSecondsWithSign = formatSecondsWithSign(3600);
                                
    expect(formattedSecondsWithSign).toBe('+01:00:00');
  });

  it('v6', () => {
    const formattedSecondsWithSign = formatSecondsWithSign(-3600);
                                        
    expect(formattedSecondsWithSign).toBe('-01:00:00');
  });

  it('v7', () => {
    const formattedSecondsWithSign = formatSecondsWithSign(86400);
                                                
    expect(formattedSecondsWithSign).toBe('+00:00:00');
  });

  it('v8', () => {
    const formattedSecondsWithSign = formatSecondsWithSign(-86400);
                                                        
    expect(formattedSecondsWithSign).toBe('-00:00:00');
  });
});

describe.skip('normalize select value', () => {
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

describe.skip('get progress color class', () => {
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

describe.skip('id', () => {
  it('v1', () => {
    vi.spyOn(Date, 'now').mockReturnValueOnce(0);
    vi.spyOn(Math, 'random').mockReturnValueOnce(10000);
    const idTest = id();

    expect(idTest).toBe('0s');
  });
});