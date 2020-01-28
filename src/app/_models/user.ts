import { Photo } from './photo';

export class User {
    constructor(
        public id?: number,
        public name?: string,
        public userName?: string,
        public password?: string,
        public dateOfBirth?: Date,
        public created?: Date,
        public city?: string,
        public country?: string,
        public state?: string,
        public street?: string,
        public district?: string,
        public number?: string,
        public cardNumber?: string,
        public email?: string,
        public phoneNumber?: string,
        public profilePhoto?: Photo
    ) {}
}
