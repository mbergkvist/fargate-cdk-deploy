#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { HellotowerStack } from '../lib/hellotower-stack';

const app = new cdk.App();
new HellotowerStack(app, 'HellotowerStack');
