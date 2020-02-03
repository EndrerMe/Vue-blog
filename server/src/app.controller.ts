import { Controller, Get, Post, UseInterceptors, UploadedFile, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root() {
    console.log('aaaaa')
    return 'aaaaaaaa'
  }
}
