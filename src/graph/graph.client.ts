import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLClient } from 'graphql-request';

@Injectable()
export default class SubgraphGraphQLClient {
  protected client = null;
  constructor(private configService: ConfigService) {
    this.client = new GraphQLClient(this.configService.get<string>('SUBGRAPH_GRAPHQL_ENDPOINT'));
  }
}
