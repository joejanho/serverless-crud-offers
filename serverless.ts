import type { AWS } from '@serverless/typescript';
// DynamoDB
import dynamoDbTables from 'resources/dynamodb-tables';
import functions from './resources/functions';

const serverlessConfiguration: AWS = {
  service: 'serverlerss-offers',
  frameworkVersion: '2',
  custom: {
    region: '${opt:region, self:provider.region}',
    stage: '${opt:stage, self:provider.stage}',
    prefix: '${self:service}-${self:custom.stage}',
    offers_table: '${self:service}-offers-table-${opt:stage, self:provider.stage}',
    ads_table: '${self:service}-ads-table-${opt:stage, self:provider.stage}',
    table_throughputs: {
      prod: 5,
      default: 1,
    },
    table_throughput: '${self:custom.TABLE_THROUGHPUTS.${self:custom.stage}, self:custom.table_throughputs.default}',
    dynamodb: {
      stages: ['dev'],
      start: {
        port: 8008,
        inMemory: true,
        heapInitial: '200m',
        heapMax: '1g',
        migrate: true,
        seed: true,
        convertEmptyValues: true,
        // Uncomment only if you already have a DynamoDB running locally
        // noStart: true
      }
    },
    ['serverless-offline']: {
      httpPort: 3000,
      babelOptions: {
        presets: ["env"]
      }
    }
  },
  plugins: [
      'serverless-bundle',
      'serverless-dynamodb-local',
      'serverless-offline',
      'serverless-dotenv-plugin',
  ],
  package: {
    individually: true,
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    stage: 'dev',
    region: 'eu-west-1',
    apiGateway: {
      shouldStartNameWithService: true,
      minimumCompressionSize: 1024,
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
            'dynamodb:DescribeTable',
            'dynamodb:Query',
            'dynamodb:Scan',
            'dynamodb:GetItem',
            'dynamodb:PutItem',
            'dynamodb:UpdateItem',
            'dynamodb:DeleteItem'
        ],
        Resource: [
          {"Fn::GetAtt": [ 'OffersTable', 'Arn' ]},
          {"Fn::GetAtt": [ 'AdsTable', 'Arn' ]}
        ]
      }
    ],
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      REGION: '${self:custom.region}',
      STAGE: '${self:custom.stage}',
      OFFERS_TABLE: '${self:custom.offers_table}',
      ADS_TABLE: '${self:custom.ads_table}',
    },
  },
  functions,
  resources: {
    Resources: dynamoDbTables,
  }
}

module.exports = serverlessConfiguration;
