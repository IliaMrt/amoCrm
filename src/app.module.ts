import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AmoCrmConnectionModule } from './amo-crm-connection/amo-crm-connection.module';
import { AmoCrmConnectionService } from './amo-crm-connection/amo-crm-connection.service';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 15000,
        maxRedirects: 5,
      }),
    }),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    AmoCrmConnectionModule,
  ],
  controllers: [AppController],
  providers: [AppService, AmoCrmConnectionService],
})
export class AppModule {}
