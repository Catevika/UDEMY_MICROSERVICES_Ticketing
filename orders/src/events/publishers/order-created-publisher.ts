import { Publisher, OrderCreatedEvent, Subjects } from '@catevikatickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
};
