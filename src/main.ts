import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppMultiModule } from './app.module.multi';
import { Logger } from '@nestjs/common';
import { LoadBalancerService } from './load-nodejs-cluster/load-nodejs-cluster.service';

async function bootstrap() {
  if (process.env.NODE_ENV === 'cluster') {
    const app = await NestFactory.create(AppMultiModule);

    const loadBalancerService = app.get(LoadBalancerService);
    await app.listen(loadBalancerService.getPort());
    Logger.log(`Application is running on: ${await app.getUrl()}`);
  } else {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
  }
}
bootstrap();
