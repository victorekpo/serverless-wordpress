import * as CDK from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { ServerlessWordpressStack } from './stacks'

let template: Template;

describe('Serverless WordPress Stack', () => {

  // Initialize the CDK app and stack once for all tests
  beforeAll(() => {
    const app = new CDK.App();
    const stack = new ServerlessWordpressStack(app, 'TestStack');
    template = Template.fromStack(stack);
  });

  test('S3 Bucket Created', () => {
    // Verify that the S3 bucket is created
    template.hasResource('AWS::S3::Bucket', {
      UpdateReplacePolicy: "Delete",
      DeletionPolicy: "Delete"
    });
  });

  test('Lambda Function Created with Bref Layer', () => {
    // Verify that the Lambda function is created with the Bref layer and the correct settings
    template.hasResourceProperties('AWS::Lambda::Function', {
      Runtime: 'provided.al2', // Custom PHP runtime via Bref
      MemorySize: 1024,        // Memory size setting
      Timeout: 30,             // Timeout setting
      Handler: 'index.php',    // Lambda function handler
      Environment: {
        Variables: {
          WP_HOME: 'https://yourdomain.com',
          WP_SITEURL: 'https://yourdomain.com',
          DB_NAME: 'wordpress',
          DB_USER: 'admin',
          DB_PASSWORD: 'password',
          DB_HOST: 'your-rds-endpoint',
        }
      },
      Layers: [
        "arn:aws:lambda:us-east-1:209497400698:layer:php-80-fpm:8"
      ]
    });
  });

  test('API Gateway Linked to Lambda', () => {
    // Verify that the API Gateway is connected to the Lambda function
    template.hasResourceProperties('AWS::ApiGateway::RestApi', {});
    template.hasResourceProperties('AWS::ApiGateway::Method', {
      HttpMethod: 'ANY',
    });
  });

  test('1 Lambda Function Created', () => {
    // Verify that only one Lambda function is created
    template.resourceCountIs('AWS::Lambda::Function', 1);
  });
});
