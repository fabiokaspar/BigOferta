export class User {
    constructor(
        public name: string,
        public username: string,
        public password: string,
        public dateOfBirth: Date,
        public created: Date,
        public city: string,
        public country: string,
    ) {}
}
