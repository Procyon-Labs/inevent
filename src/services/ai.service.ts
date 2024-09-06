import { ISponsorshipAd } from '../interfaces';
import { SponsorshipAdModel } from '../models/sponsorship-ad.model';
import { Types } from 'mongoose';

let sentAds: Types.ObjectId[] = []; // Store ObjectId instead of strings

export async function getRandomSponsorAd(): Promise<string | boolean> {
  while (true) {
    // Use a loop instead of recursion
    let ad = await SponsorshipAdModel.aggregate([
      {
        $match: {
          _id: { $nin: sentAds }, // Match against ObjectIds
        },
      },
      {
        $limit: 1, // Limit to find one document
      },
    ]);

    if (ad.length > 0) {
      sentAds.push(ad[0]._id);
      
      // return ad[0];
      return `${ad[0].title}\n${ad[0].description}`;
    }

    // If no ad is found, reset the sentAds array and loop again
    if (sentAds.length == 0) return false; //No sponsorship ad exists yet
    sentAds = [];
  }
}
