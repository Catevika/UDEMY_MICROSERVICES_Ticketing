import { Publisher, ExpirationCompleteEvent, Subjects } from '@catevikatickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
};