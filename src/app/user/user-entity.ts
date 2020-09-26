export class UserEntity {
    constructor(
        public id: string,
        public accessCode: string,
        public accessType: string,
        public name: string,
        public partyResponsibility: string,
        public password: string,
        public phoneNo: string,
        public adminApproved: boolean
    ) { }
}