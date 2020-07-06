import * as cdk from "@aws-cdk/core";
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";

export class HellotowerStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "ClusterVPC", {
      cidr: "10.0.0.0/28",
      maxAzs: 1,
      subnetConfiguration: [
        {
          cidrMask: 28,
          name: "public",
          subnetType: ec2.SubnetType.PUBLIC,
        },
      ],
    });

    const cluster = new ecs.Cluster(this, "Cluster", {
      vpc: vpc,
    });

    const task = new ecs.TaskDefinition(this, "Task", {
      compatibility: ecs.Compatibility.FARGATE,
      cpu: "256",
      memoryMiB: "512",
    });

    task.addContainer("WebService", {
      image: ecs.ContainerImage.fromAsset("./app"),
    });

    const webServiceSG = new ec2.SecurityGroup(this, "WebServiceSG", {
      vpc,
    });
    webServiceSG.connections.allowFromAnyIpv4(ec2.Port.tcpRange(8080, 8080));

    const service = new ecs.FargateService(this, "Service", {
      assignPublicIp: true,
      cluster,
      desiredCount: 1,
      securityGroups: [webServiceSG],
      taskDefinition: task,
    });
  }
}
