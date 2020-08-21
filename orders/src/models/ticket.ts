import mongoose from 'mongoose';
import { Order, OrderStatus } from './order';


interface TicketAttrs {
  id: string;
  title: string;
  price: number;
}

export interface TicketDoc extends mongoose.Document {
  version: number;
  title: string;
  price: number;
  isReserved(): Promise<boolean>;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
  findByEvent(event: { id: string, version: number }): Promise<TicketDoc | null>;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

ticketSchema.set('versionKey', 'version');

// Mongoose works with functions to not overwrite the keyword this! NOT POSSIBLE TO USE ARROW FUNCTIONS
ticketSchema.pre('save', function (done) {
  // Because $where type is not defined inside the mongoose types... So, the only thing we can do about is to tell typescript tp ignore the respective error
  // @ts-ignore
  this.$where = {
    version: this.get('version') - 1
  };

  done();
})

ticketSchema.statics.findByEvent = (event: { id: string, version: number }) => {
  return Ticket.findOne({
    _id: event.id,
    version: event.version - 1
  })
}
ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket({
    // To be adapted if the TicketAttrs changes one day...
    // Not ideal, but does the job
    _id: attrs.id, // The _id becomes an id
    title: attrs.title,
    price: attrs.price
  });
};

/* Run query to look at all orders. Find an order where the ticket is the ticket we just found and the order status is not cancelled. If we find an order from this, that means the ticket is reserved */
ticketSchema.methods.isReserved = async function () {
  // this === the ticket document that we just called 'isReserved' on
  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      // MongoDB operator to find a status among all with the specificity given in the $in:
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete
      ]
    }
  });
  // with !!existingOrder, the Promise resolve true if existing and false when null. This is a way to use a Promise that return a boolean
  return !!existingOrder;
}

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };
