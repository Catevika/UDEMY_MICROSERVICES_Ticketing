import { Publisher, Subjects, PaymentCreatedEvent } from '@catevikatickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated
};