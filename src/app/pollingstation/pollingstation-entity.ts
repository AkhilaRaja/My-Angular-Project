export class PollingstationEntity {
    constructor(
        public id: string,
        public districtCode: string,
        public districtName: string,
        public localBodyCode: string,
        public localBodyName: string,
        public wardCode: string,
        public wardName: string,
        public pollingStationCode: string,
        public pollingStationName: string,
        public status: boolean
    ) { }
}