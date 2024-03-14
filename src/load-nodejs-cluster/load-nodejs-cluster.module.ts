// src/load-balancer/load-balancer.module.ts

import { Module } from '@nestjs/common';
import { LoadBalancerService } from './load-nodejs-cluster.service';

@Module({
  providers: [LoadBalancerService],
})
export class LoadBalancerModule {}
