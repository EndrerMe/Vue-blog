// Vendors
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, getCustomRepository } from "typeorm";

// Interfaces
import { IError, IArticle } from "../interfaces";
// Entities
import { Articles } from "../entities";
// Repositories
import { ArticleRepository } from "../repositories/article.repository";

@Injectable()
export class ArticlesService {
    private articleRep = getCustomRepository(ArticleRepository)

    constructor(
        @InjectRepository(Articles)
        private readonly authRepository: Repository<Articles>,
    ) {}

    public async createArticle(data: IArticle): Promise<IError> {
        let createResponce;
        await this.articleRep.createArticle(data).then((res) => {
            createResponce = res;
        })
        return createResponce;
    }

    public async getArticles(params: {page: number}): Promise<IArticle[]> {
        const limit = 12;
        const offset = (params.page - 1) * limit;
        return this.articleRep.getArticles(limit, offset);
    }
}