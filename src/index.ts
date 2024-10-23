import * as CDK from 'aws-cdk-lib';
import { ServerlessWordpressStack } from "@/stacks";

const app = new CDK.App();

const stack = new ServerlessWordpressStack(app, 'Serverless-Wordpress');
console.log('Serverless Wordpress stack deployed', stack);