// import { Construct } from 'constructs';
// import * as CDK from 'aws-cdk-lib';
// import * as Apigw from 'aws-cdk-lib/aws-apigateway';
// import * as lambda from 'aws-cdk-lib/aws-lambda';
// import * as s3 from 'aws-cdk-lib/aws-s3';
// import * as rds from 'aws-cdk-lib/aws-rds';
// import * as ec2 from 'aws-cdk-lib/aws-ec2';
// import { ManagedPolicy } from 'aws-cdk-lib/aws-iam';
// import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
//
// export class ServerlessWordpressStack extends CDK.Stack {
//   constructor(scope: Construct, id: string, props?: CDK.StackProps) {
//     super(scope, id, props);
//
//     // S3 bucket for media storage
//     const bucket = new s3.Bucket(this, 'WordpressMediaBucket', {
//       removalPolicy: CDK.RemovalPolicy.DESTROY,
//     });
//
//     // VPC for Lambda and RDS
//     const vpc = new ec2.Vpc(this, 'Vpc', { maxAzs: 2 });
//
//     // Lambda Layer for PHP
//     const brefPhpLayer = lambda.LayerVersion.fromLayerVersionArn(
//       this,
//       'BrefPhpLayer',
//       'arn:aws:lambda:YOUR_REGION:209497400698:layer:php-80-fpm:8'
//     );
//
//     // RDS Database with credentials from Secrets Manager
//     const dbCredentials = new secretsmanager.Secret(this, 'DBCredentialsSecret', {
//       generateSecretString: {
//         secretStringTemplate: JSON.stringify({ username: 'admin' }),
//         generateStringKey: 'password',
//         excludePunctuation: true,
//       }
//     });
//
//     const db = new rds.DatabaseInstance(this, 'WordpressRDS', {
//       engine: rds.DatabaseInstanceEngine.mysql({ version: rds.MysqlEngineVersion.VER_8_0 }),
//       vpc,
//       credentials: rds.Credentials.fromSecret(dbCredentials),
//       vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_NAT },
//       allocatedStorage: 20,
//       maxAllocatedStorage: 100,
//     });
//
//     // Lambda function to run WordPress
//     const wordpressFunction = new lambda.Function(this, 'WordpressFunction', {
//       runtime: lambda.Runtime.PROVIDED_AL2,
//       handler: 'index.php',
//       code: lambda.Code.fromAsset('src/functions/wordpress/wp'),
//       layers: [brefPhpLayer],
//       memorySize: 1024,
//       timeout: CDK.Duration.seconds(30),
//       environment: {
//         WP_HOME: 'https://yourdomain.com',
//         WP_SITEURL: 'https://yourdomain.com',
//         DB_NAME: 'wordpress',
//         DB_USER: dbCredentials.secretValueFromJson('username').toString(),
//         DB_PASSWORD: dbCredentials.secretValueFromJson('password').toString(),
//         DB_HOST: db.dbInstanceEndpointAddress,
//         S3_BUCKET: bucket.bucketName,
//       },
//       vpc,
//     });
//
//     // Grant access to the S3 bucket and Secrets Manager
//     bucket.grantReadWrite(wordpressFunction);
//     dbCredentials.grantRead(wordpressFunction);
//
//     // API Gateway to expose the Lambda function
//     const api = new Apigw.LambdaRestApi(this, 'WordpressApi', {
//       handler: wordpressFunction,
//       proxy: true,
//     });
//
//     // Add basic Lambda permissions
//     wordpressFunction.role?.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'));
//   }
// }
