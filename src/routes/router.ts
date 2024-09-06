import { Router, Request, Response } from 'express';
import { getRandomSponsorAd } from '../services';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Server is up and running');
});

// Health check route
router.get('/health', (req: Request, res: Response) => {
  res.status(200).send('Server is healthy');
});

router.get('/random-ad', async (req: Request, res: Response) => {
  const ad = await getRandomSponsorAd();
  return res.send(ad);
});

router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'Server is healthy',
    uptime: process.uptime(), // Server uptime in seconds
    timestamp: new Date(), // Current server time
  });
});

export default router;
