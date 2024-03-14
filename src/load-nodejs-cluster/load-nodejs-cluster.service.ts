import { Injectable, OnModuleInit } from '@nestjs/common';
import * as _cluster from 'cluster';
const cluster = _cluster as unknown as _cluster.Cluster;

@Injectable()
export class LoadBalancerService implements OnModuleInit {
  private numCPUs: number;

  constructor() {
    this.numCPUs = 4;
  }

  onModuleInit() {
    if (cluster.isPrimary) {
      for (let i = 0; i < this.numCPUs; i++) {
        cluster.fork();
      }

      cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
      });
    } else {
      console.log(`Worker ${process.pid} started`);
      require('../main');
    }
  }

  getPort() {
    if (cluster.isPrimary) return 4000;
    else {
      return 4000 + (cluster.worker.id % this.numCPUs) + 1;
    }
  }
}
