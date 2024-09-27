import { describe, it, expect, vi } from 'vitest';
import { 
  updateTimelineItem, 
  resetTimelineItemActivities, 
  calculateTrackedActivitySeconds 
} from '../src/timeline-items';
import { Activity, Hour, TimelineItem } from '../src/types';
import { SECONDS_IN_HOUR } from '../src/constants';

describe('update timeline item', () => {
  it('v1', () => {
    const timelineItem: TimelineItem = {
      hour: 1,
      activityId: '1',
      activitySeconds: SECONDS_IN_HOUR * 0,
      isActive: false
    };

    const updatedFields: TimelineItem = {
      hour: 2,
      activityId: '2',
      activitySeconds: SECONDS_IN_HOUR * 1,
      isActive: true

    };

    const updatedTimelineItem = updateTimelineItem(timelineItem, updatedFields);

    expect(timelineItem).toEqual(updatedFields);
    expect(updatedTimelineItem).toEqual(updatedFields);
  });
});

describe('reset timeline item activities', () => {
  it('v1', () => {
    const date = new Date('2024-04-10T02:00:00');

    vi.setSystemTime(date);

    const trainingActivity: Activity = {
      id: '1',
      name: 'Training',
      secondsToComplete: SECONDS_IN_HOUR * 1
    };

    const readingActivity: Activity = {
      id: '2',
      name: 'Reading',
      secondsToComplete: SECONDS_IN_HOUR * 2
    };

    const timelineItems: TimelineItem[] = [
      {
        hour: 1,
        activityId: trainingActivity.id,
        activitySeconds: SECONDS_IN_HOUR * 1,
        isActive: false
      },
      {
        hour: 2,
        activityId: trainingActivity.id,
        activitySeconds: SECONDS_IN_HOUR * 2,
        isActive: true
      },
      {
        hour: 3,
        activityId: readingActivity.id,
        activitySeconds: SECONDS_IN_HOUR * 2,
        isActive: true
      }
    ];
    
    resetTimelineItemActivities(timelineItems, trainingActivity);

    expect(timelineItems).toEqual([
      {
        hour: 1,
        activityId: null,
        activitySeconds: SECONDS_IN_HOUR * 0,
        isActive: false
      },
      {
        hour: date.getHours() as Hour,
        activityId: null,
        activitySeconds: SECONDS_IN_HOUR * 2,
        isActive: true
      },
      {
        hour: 3,
        activityId: readingActivity.id,
        activitySeconds: SECONDS_IN_HOUR * 2,
        isActive: true
      }
    ]);

    vi.useRealTimers();
  });
});

describe('calculate tracked activity seconds', () => {
  it('v1', () => {
    const trainingActivity: Activity = {
      id: '1',
      name: 'Training',
      secondsToComplete: SECONDS_IN_HOUR * 1
    };
    
    const readingActivity: Activity = {
      id: '2',
      name: 'Reading',
      secondsToComplete: SECONDS_IN_HOUR * 2
    };
    
    const timelineItems: TimelineItem[] = [
      {
        hour: 1,
        activityId: trainingActivity.id,
        activitySeconds: SECONDS_IN_HOUR * 1,
        isActive: false
      },
      {
        hour: 2,
        activityId: trainingActivity.id,
        activitySeconds: SECONDS_IN_HOUR * 2,
        isActive: true
      },
      {
        hour: 3,
        activityId: readingActivity.id,
        activitySeconds: SECONDS_IN_HOUR * 2,
        isActive: true
      }
    ];
    
    const trackedTrainingActivitySeconds = calculateTrackedActivitySeconds(timelineItems, trainingActivity);
    const trackedReadingActivitySeconds = calculateTrackedActivitySeconds(timelineItems, readingActivity);
    
    expect(trackedTrainingActivitySeconds).toBe(SECONDS_IN_HOUR * 3);
    expect(trackedReadingActivitySeconds).toBe(SECONDS_IN_HOUR * 2);
  });
});