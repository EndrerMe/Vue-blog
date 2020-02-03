// Vendors
import { Controller, Post, Body, Get, UseInterceptors, UploadedFile, Param, Res } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

// Interfaces
import { IError, IArticle } from './../core/interfaces';
import { FileInterceptor } from '@nestjs/platform-express';
// Services
import { ArticlesService } from './../core/services';
import { createReadStream, readFileSync, readFile } from 'fs';

@Controller('articles')
export class ArticlesController {
    
    constructor(
        private articlesService: ArticlesService,
    ) {}

    SERVER_URL: string  =  "http://localhost:3000/";

    @Get('getArticles/:page')
    public async getAllArticles(@Param() params): Promise<IArticle[]> {
        return this.articlesService.getArticles(params)
    }

    @Post('create')
    @UseInterceptors(FileInterceptor('image'))
    uploadedFile(@Body() file) {
        console.log(file)
    }
    // @Post('create')
    // @UseInterceptors(
    //     FileInterceptor('image',
    //     {
    //         storage: diskStorage({
    //             destination: './public',
    //             filename: (req, file, cb) => {
    //                 const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
    //                 return cb(null, `${randomName}${extname(file.originalname)}`)
    //             },
    //         }),
    //     }),
    // )
    // uploadedFile(@UploadedFile() file, @Body() data) {
    //     console.log(file, data)
    //     return;
    // }

    @Get('getImage/:imgpath')
    seeUploadedFile(@Param('imgpath') image, @Res() res) {
        return res.sendFile(image, { root: './../public' });
    }

}
