import { Module } from '@nestjs/common';
import { AmoCrmConnectionService } from './amo-crm-connection.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [HttpModule],
  providers: [AmoCrmConnectionService, ConfigService],
})
export class AmoCrmConnectionModule {}
