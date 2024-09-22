import { beforeEach, describe, expect, it } from 'vitest';
import { updateActivity } from '../src/activities';
import { Activity } from '../src/types';

let activity: Activity;

describe.skip('updates activity', () => {
  beforeEach(() => {
    activity = {
      id: '1',
      name: 'Training',
      secondsToComplete: 3600
    };
  });

  it('v1', () => {
    // arrange (given)
    const updatedActivity: Activity = {
      id: '2',
      name: 'Reading',
      secondsToComplete: 7200
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
      secondsToComplete: 7200
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
      secondsToComplete: 3600
    });
  });
});

it.todo('calculate activity completion percentage');