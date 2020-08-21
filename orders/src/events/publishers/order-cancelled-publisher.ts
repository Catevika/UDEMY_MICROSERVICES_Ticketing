import { Publisher, OrderCancelledEvent, Subjects } from '@catevikatickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
};