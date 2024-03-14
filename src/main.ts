import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppMultiModule } from './app.module.multi';
import { Logger, ValidationPipe } from '@nestjs/common';
import { LoadBalancerService } from './load-nodejs-cluster/load-nodejs-cluster.service';

async function bootstrap() {
  if (process.env.NODE_ENV === 'cluster') {
    const app = await NestFactory.create(AppMultiModule);
    app.useGlobalPipes(new ValidationPipe());

    const loadBalancerService = app.get(LoadBalancerService);
    await app.listen(loadBalancerService.getPort());
    Logger.log(`Application is running on: ${await app.getUrl()}`);
  } else {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(process.env.port || 3000);
  }
}
bootstrap();
