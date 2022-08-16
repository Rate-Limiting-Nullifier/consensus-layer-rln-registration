
import { GraphQLClient, gql } from 'graphql-request'

class QueryGraph {
    private client: GraphQLClient;

    constructor(endpoint: string) {
        this.client = new GraphQLClient(endpoint, {});
    }

    async getRegistration(pubkey: string): Promise<any> {
        let query = gql`
            {
                registrationEntities(where: {pubkey_contains: "${pubkey}"}) {
                    id
                    pubkey
                    idCommitment
                    signature
                }
            }
        `;
        return await this.client.request(query);
    }

    async getAllRegistrations(): Promise<any> {
        let query = gql`
        {
            registrationEntities(first: 5) {
              id
              pubkey
              idCommitment
              signature
            }
          }
        `;
        return await this.client.request(query);
    }
}

export default QueryGraph