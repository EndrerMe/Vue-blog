// Vendors
import { EntityRepository, Repository } from "typeorm";

// Entities
import { Articles } from "../entities";
// Interfaces
import { IArticle, IError } from "../interfaces";

@EntityRepository(Articles)
export class ArticleRepository extends Repository<Articles> {

    public async createArticle(data: IArticle): Promise<IError> {
        await this.save(data);
        return {
            messages: [],
        };
    }

    public async getArticles(limit: number, offset: number): Promise<IArticle[]> {
        const articles = await this.find({
            skip: offset,
            take: limit,
        })
        return articles;
    }

}