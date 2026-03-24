import { describe, expect, it } from '@jest/globals';

import { feedbackService } from '../services/feedbackService';

describe('feedbackService', () => {
  it('resolves without throwing in no-op mode for all supported events', async () => {
    await expect(feedbackService.trigger('move')).resolves.toBeUndefined();
    await expect(feedbackService.trigger('win')).resolves.toBeUndefined();
    await expect(feedbackService.trigger('draw')).resolves.toBeUndefined();
    await expect(feedbackService.trigger('restart')).resolves.toBeUndefined();
  });
});
