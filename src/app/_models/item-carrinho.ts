export class ItemCarrinho {
    constructor(
        public offerId?: number,
        public category?: string,
        public title?: string,
        public description?: string,
        public advertiser?: string,
        public price?: number,
        public amount?: number,
        public photoUrl?: string
    ) { }
}
