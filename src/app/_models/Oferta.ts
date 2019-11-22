import { Photo } from './photo';

export class Oferta {
    public id?: number;
    public category?: string;
    public title?: string;
    public description?: string;
    public advertiser?: string;
    public price?: number;
    public isHanked?: boolean;
    public photos?: Array<Photo>;
    public comoUsar?: string;
    public ondeFica?: string;
}
