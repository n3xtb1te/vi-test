import { beforeEach, describe, expect, it } from 'vitest';
import { updateActivity, calculateActivityCompletionPercentage } from '../src/activities';
import { Activity } from '../src/types';
import { FIFTY_PERCENT, HUNDRED_PERCENT, SECONDS_IN_HOUR, ZERO_PERCENT } from '../src/constants';

let activity: Activity;

describe('updates activity', () => {
  beforeEach(() => {
    activity = {
      id: '1',
      name: 'Training',
      secondsToComplete: SECONDS_IN_HOUR * 1
    };
  });

  it('v1', () => {
    // arrange (given)
    const updatedActivity: Activity = {
      id: '2',
      name: 'Reading',
      secondsToComplete: SECONDS_IN_HOUR * 2
    };
  
    // act (when)
    updateActivity(activity, updatedActivity);
  
    // assert (then)
    expect(activity).toEqual(updatedActivity);
  });

  it('v2', () => {
    const updatedFields: Activity = {
      id: '2',
      name: 'Reading',
      secondsToComplete: SECONDS_IN_HOUR * 2
    };
  
    const updatedActivity = updateActivity(activity, updatedFields);
  
    expect(updatedActivity).toEqual(updatedFields);
  });

  it('v3', () => {
    const updatedFields: Partial<Activity> = {
      id: '2',
    };
  
    const updatedActivity = updateActivity(activity, updatedFields);
  
    expect(updatedActivity).toEqual({
      id: '2',
      name: 'Training',
      secondsToComplete: SECONDS_IN_HOUR * 1
    });
  });
});

describe('calculate activity completion percentage', () => {
  beforeEach(() => {
    activity = {
      id: '1',
      name: 'Training',
      secondsToComplete: SECONDS_IN_HOUR * 1
    };
  });

  it('v1', () => {
    const percentage = calculateActivityCompletionPercentage(activity, SECONDS_IN_HOUR * 0);

    expect(percentage).toBe(ZERO_PERCENT);
  });

  it('v2', () => {
    const percentage = calculateActivityCompletionPercentage(activity, SECONDS_IN_HOUR * 0.5);

    expect(percentage).toBe(FIFTY_PERCENT);
  });

  it('v3', () => {
    const percentage = calculateActivityCompletionPercentage(activity, SECONDS_IN_HOUR * 1);
    
    expect(percentage).toBe(HUNDRED_PERCENT);
  });
});
