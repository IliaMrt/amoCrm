import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { QueryDto } from './Dto/queryDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getQuery(@Query() query: QueryDto) {
    return await this.appService.getQuery(query);
  }
}
