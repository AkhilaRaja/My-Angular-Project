export class VoterEntity {
    constructor(
        public id: string,
        public pollingStationCode: string,
        public serialNo: number,
        public voterName: string,
        public guardianName: string,
        public houseNo: string,
        public address: string,
        public gender: string,
        public age: number,
        public idCardNo: string
    ) { }
}