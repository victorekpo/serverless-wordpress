import { Template } from 'aws-cdk-lib/assertions';
import * as CDK from 'aws-cdk-lib';
import { ServerlessWordpressStack } from './stacks';

let template: Template;

describe('CDK Stack', () => {
  beforeAll(() => {
    const app = new CDK.App();
    const stack = new ServerlessWordpressStack(app, 'MyTestStack-API');
    template = Template.fromStack(stack);
    console.log('Template', JSON.stringify(template, null, 2));
  });

  test('API Gateway Proxy Created', () => {
    console.log('Testing API Gateway');
    template.hasResourceProperties('AWS::ApiGateway::Resource', {
      'PathPart': 'health', // use proxy for catch all '{proxy+}'
    });
  });

  test('1 Lambda Function Created', () => {
    console.log('Testing Lambda Functions');
    template.resourceCountIs('AWS::Lambda::Function', 1);
  });
});
