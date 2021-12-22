import nodeCron from 'node-cron';
import { pingDevices } from './ping';

export const startCron = async () => {
    nodeCron.schedule('* * * * *', pingDevices);
  
    await pingDevices();
}
