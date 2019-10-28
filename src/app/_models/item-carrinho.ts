export class ItemCarrinho {
    constructor(
        public id?: number,
        public titulo?: string,
        public descricao?: string,
        public anunciante?: string,
        public valor?: number,
        public quantidade?: number,
        public imagem?: string
    ) { }
}
