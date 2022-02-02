
import { GraphQLClient, gql } from 'graphql-request'

class QueryGraph {
    private client: GraphQLClient;

    constructor(endpoint: string) {
        this.client = new GraphQLClient(endpoint, {});
    }

    async getRegistration(pubkey: string): Promise<any> {
        let query = gql`
            {
                registrationEntities(first: 1, where: {pubkey: "${pubkey}"}) {
                    id
                    pubkey
                    idCommitment
                    signature
                }
            }
        `;
        console.log(query);
        let result = await this.client.request(query);
        console.log(result)
        return result;
    }

    async getAllRegistrations(): Promise<any> {
        let query = gql`
        { registrationEntities() {
            id
            pubkey
            idCommitment
            signature
        }}
        `;
        console.log(query);
        let result = await this.client.request(query);
        console.log(result)
        return result;
    }
}

export default QueryGraph