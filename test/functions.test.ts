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
  it.each([
    [SECONDS_IN_MINUTE * 0, '00:00:00'],
    [SECONDS_IN_MINUTE * 1, '00:01:00'],
    [SECONDS_IN_HOUR * 1, '01:00:00'],
    [SECONDS_IN_DAY * 1, '00:00:00']
  ])('formatSeconds(%i) -> %s', (seconds, expected) => {
    expect(formatSeconds(seconds)).toBe(expected);
  });
});

describe('format seconds with sign', () => {
  it.each([
    [SECONDS_IN_MINUTE * 0, '+00:00:00'],
    [-SECONDS_IN_MINUTE * 0, '+00:00:00'],
    [SECONDS_IN_MINUTE * 1, '+00:01:00'],
    [-SECONDS_IN_MINUTE * 1, '-00:01:00'],
    [SECONDS_IN_HOUR * 1, '+01:00:00'],
    [-SECONDS_IN_HOUR * 1, '-01:00:00'],
    [SECONDS_IN_DAY * 1, '+00:00:00'],
    [-SECONDS_IN_DAY * 1, '-00:00:00']
  ])('formatSecondsWithSign(%i) -> %s', (seconds, expected) => {
    expect(formatSecondsWithSign(seconds)).toBe(expected);
  });
});

describe('normalize select value', () => {
  it.each([
    [null, null],
    ['string', 'string'],
    ['1', 1],
    ['-1', -1],
    ['1.5string', '1.5string']
  ])('normalizeSelectValue(%s) -> %s', (value, expected) => {
    expect(normalizeSelectValue(value)).toBe(expected);
  });
});

describe('get progress color class', () => {
  it.each([
    [0, ProgressColorClass.RED],
    [LOW_PERCENT - 1, ProgressColorClass.RED],
    [MEDIUM_PERCENT - 1, ProgressColorClass.YELLOW],
    [HUNDRED_PERCENT - 1, ProgressColorClass.BLUE],
    [HUNDRED_PERCENT, ProgressColorClass.GREEN]
  ])('getProgressColorClass(%i) -> %s', (percentage, expected) => {
    expect(getProgressColorClass(percentage)).toBe(expected);
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