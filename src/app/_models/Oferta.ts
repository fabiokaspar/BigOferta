// import { ImagemUrl } from './ImagemUrl';

export class Oferta {
    public id?: number;
    public categoria?: string;
    public titulo?: string;
    public descricao?: string;
    public anunciante?: string;
    public valor?: number;
    public destaque?: boolean;
    public adicionada?: boolean;
    public imagens?: Array<{url: any}>;
}
