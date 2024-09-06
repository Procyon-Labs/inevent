import { GeneralService } from '../helpers';
import { SponsorshipAdModel } from '../models/sponsorship-ad.model';

export * from './ai.service';
export const sponsorshipAdService = new GeneralService(SponsorshipAdModel);
