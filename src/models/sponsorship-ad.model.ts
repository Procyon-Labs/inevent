// import mongooseAutoPopulate from 'mongoose-autopopulate';
import { DATABASES } from '../configs';
import { ISponsorshipAd } from '../interfaces';
import { model, Schema } from 'mongoose';
import { paginatePlugin } from '../utils';
// import { paginatePlugin } from '../utils';

const sponsorshipAdSchema = new Schema<ISponsorshipAd>(
  {
    user: {
      // type: Schema.Types.ObjectId,
      type: String,
      // required: true,
      // ref: DATABASES.USER,
      // autopopulate: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    quantity: { type: Number, required: false },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// sponsorshipAdSchema.plugin(mongooseAutoPopulate);
sponsorshipAdSchema.plugin(paginatePlugin);

export const SponsorshipAdModel = model<ISponsorshipAd>(
  DATABASES.SPONSORSHIP_AD,
  sponsorshipAdSchema
);
