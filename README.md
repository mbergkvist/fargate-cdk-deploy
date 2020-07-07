# Fargate CDK Deploy

This is a sample [AWS CDK](https://aws.amazon.com/cdk/) application to illustrate how one can build a
[Docker](https://www.docker.com/) image and deploy it to [AWS Fargate](https://aws.amazon.com/fargate/) by using CDK.

To get started, run `npm install` to install the dependencies and then `cdk deploy [--profile PROFILE]`.

This will build a Docker image of the application in `./app`, deploy a small VPC with only a public subnet, an ECS
Cluster and a Fargate service with a single task; the Docker image of the application.

The stack is intentionally kept very basic, with no load balancing, auto scaling etc, and is not fit for production.
