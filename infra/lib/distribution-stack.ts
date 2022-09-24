import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as s3 from "aws-cdk-lib/aws-s3";
import { config } from "dotenv";
import { Distribution } from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins"

config();

export class DistributionStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    /**
     * TODO: this should follow principle of least privilege
     *
     * Permissions likely needed for CI/CD
     * s3:GetObject, s3:PutObject, and s3:ListBucket
     *
     * Possibly s3:DeleteObject also required
     */
    const user = new iam.User(this, "User", {
      userName: process.env.AWS_STACK ?? "",
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonS3FullAccess"),
        iam.ManagedPolicy.fromAwsManagedPolicyName("CloudFrontFullAccess"),
      ],
    });

    const creds = new iam.CfnAccessKey(this, "Creds", {
      userName: user.userName,
    });

    new cdk.CfnOutput(this, "AwsAccessKeyId", {
      value: creds.ref
    });

    new cdk.CfnOutput(this, "AwsSecretAccessKey", {
      value: creds.attrSecretAccessKey
    });

    const bucket = new s3.Bucket(this, process.env.AWS_BUCKET ?? "", {
      bucketName: process.env.AWS_BUCKET,
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html",
    });

    new cdk.CfnOutput(this, "AwsBucket", {
      value: bucket.bucketName
    });

    const cdn = new Distribution(this, 'CDN', {
      defaultBehavior: { origin: new S3Origin(bucket) }
    });

    new cdk.CfnOutput(this, "DistributionDomainName", {
      value: cdn.distributionDomainName,
    });

    new cdk.CfnOutput(this, "AwsDistributionId", {
      value: cdn.distributionId,
    });
  }
}
