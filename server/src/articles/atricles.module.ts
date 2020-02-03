// Vendors
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { ArticlesController } from './articles.controller';
// Services
import { ArticlesService } from './../core/services';
// Entities
import { Articles } from './../core/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Articles]),
  ],
  providers: [
    ArticlesService,
  ],
  controllers: [ArticlesController]
})
export class ArticlesModule {}