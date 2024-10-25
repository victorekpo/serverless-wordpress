import { Construct } from 'constructs';
import * as CDK from 'aws-cdk-lib';
import * as Apigw from 'aws-cdk-lib/aws-apigateway';
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as s3 from "aws-cdk-lib/aws-s3";
import { ManagedPolicy } from "aws-cdk-lib/aws-iam";


export class ServerlessWordpressStack extends CDK.Stack {
  constructor(scope: Construct, id: string, props?: CDK.StackProps) {
    super(scope, id, props);

    // S3 bucket for WordPress media (optional but recommended)
    const bucket = new s3.Bucket(this, 'WordpressMediaBucket', {
      removalPolicy: CDK.RemovalPolicy.DESTROY,
    });

    // Lambda Layer for PHP
    const brefPhpLayer = lambda.LayerVersion.fromLayerVersionArn(
      this,
      'BrefPhpLayer',
      'arn:aws:lambda:us-east-1:209497400698:layer:php-80-fpm:8'
    );

    // Lambda function running WordPress (PHP via Bref)
    const wordpressFunction = new lambda.Function(this, 'WordpressFunction', {
      runtime: lambda.Runtime.PROVIDED_AL2, // Custom runtime provided by Bref
      handler: 'index.php',
      code: lambda.Code.fromAsset('src/functions/wordpress'), // Folder where PHP/WordPress code resides
      layers: [brefPhpLayer],
      memorySize: 1024, // Adjust memory as necessary
      timeout: CDK.Duration.seconds(120), // Increase the timeout here
      environment: {
        WP_HOME: 'https://yourdomain.com',
        WP_SITEURL: 'https://yourdomain.com',
        DB_NAME: 'wordpress',
        DB_USER: 'admin',
        DB_PASSWORD: 'password',
        DB_HOST: 'your-rds-endpoint', // RDS or any MySQL-compatible DB
        S3_BUCKET: bucket.bucketName,
      },
    });

    // Grant the Lambda function access to the S3 bucket for media uploads
    bucket.grantReadWrite(wordpressFunction);

    // API Gateway to expose the Lambda function over HTTP
    const api = new Apigw.LambdaRestApi(this, 'WordpressApi', {
      handler: wordpressFunction,
      proxy: true,
    });

    // Optional: Add permissions for logging
    wordpressFunction.role?.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'));
  }

}