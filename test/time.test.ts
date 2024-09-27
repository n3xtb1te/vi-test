import { describe, it, expect, vi } from 'vitest';
import { today, tomorrow, endOfHour, isToday, toSeconds } from '../src/time';
import { MILLISECONDS_IN_SECOND } from '../src/constants';

describe('today', () => {
  it('v1', () => {
    const date = new Date('1990-01-01');

    vi.setSystemTime(date);

    expect(today()).toEqual(date);

    vi.useRealTimers();
  });
});

describe('tomorrow', () => {
  it('v1', () => {
    const date = new Date('1990-01-01');
    const tomorrowDate = new Date('1990-01-02');

    vi.setSystemTime(date);

    expect(tomorrow()).toEqual(tomorrowDate);

    vi.useRealTimers();
  });
});

describe('end of hour', () => {
  it('v1', () => {
    const date = new Date('2024-04-10T10:15:00');
    const endOfHourDate = new Date('2024-04-10T11:00:00');

    expect(endOfHour(date)).toEqual(endOfHourDate);
  });
});

describe('is today', () => {
  it('v1', () => {
    const date = new Date('2024-01-01');

    expect(isToday(date)).toBe(false);
  });

  it('v2', () => {
    const date = new Date();
    
    expect(isToday(date)).toBe(true);
  });
});

describe('to seconds', () => {
  it('v1', () => {
    expect(toSeconds(MILLISECONDS_IN_SECOND * 1)).toBe(1);             
  });

  it('v2', () => {
    expect(toSeconds(MILLISECONDS_IN_SECOND * 0)).toBe(0);             
  });

  it('v3', () => {
    expect(toSeconds(-MILLISECONDS_IN_SECOND * 1)).toBe(-1);
  });
});