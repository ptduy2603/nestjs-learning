import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsModule } from './modules/comments/comments.module';
import { ProductsModule } from './modules/products/products.module';
import { LoggingMiddleware } from './middlewares/logging';

@Module({
  // config env here
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nestjs',
      entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
      synchronize: true,
    }),
    CommentsModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL }); // Apply the logging middleware to all routes
  }
}
