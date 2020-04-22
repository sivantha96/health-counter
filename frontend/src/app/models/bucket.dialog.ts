import { Islide } from './bucket';

export interface DialogData {
  currentBucket: string[];
  indexBucket: number;
  carouselTemplate: Islide[];
  deletedItems: any[]
  isNoChange: boolean;
}
