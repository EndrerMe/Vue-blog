// Vendors
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { MulterModule } from '@nestjs/platform-express';

// Controllers
import { AppController } from './app.controller';
// Services
import { AppService } from './app.service';
// Modules
import { AuthModule } from './auth/auth.module';
import { ArticlesModule } from './articles/atricles.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'denzill',
      entities: ['src/core/entities/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    ArticlesModule,
    MulterModule.register({
      dest: './public',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(
    private readonly connection: Connection,
  ) {}
}
