export class CandidateEntity {
    constructor(
        public id: string,
        public pollingStationCode: string,
        public candidateCode: string,
        public candidateName: string,
        public candidateColor: string,
        public electionBody: string,
        public partyCode: string,
    ) { }
}