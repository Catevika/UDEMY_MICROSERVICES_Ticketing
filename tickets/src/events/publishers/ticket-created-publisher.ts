import { Publisher, Subjects, TicketCreatedEvent } from '@catevikatickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
};