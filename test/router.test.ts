// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest';
import { normalizePageHash } from '../src/router';
import { PageName } from '../src/types';

describe('normalize page hash', () => {
  it.each(Object.values(PageName))('valid page hash: %s', (page) => {
    window.location.hash = page;
        
    expect(normalizePageHash()).toBe(page);
    expect(window.location.hash).toBe(`#${page}`);

  });


  it('v2 invalid page hash', () => {
    window.location.hash = 'invalid';
    
    expect(normalizePageHash()).toBe(PageName.TIMELINE);
    expect(window.location.hash).toBe(`#${PageName.TIMELINE}`);
  });
});