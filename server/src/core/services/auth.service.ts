// Vendors
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { getCustomRepository, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

// Interfaces
import { IUser, ILogin } from "../interfaces";
// Repositoryes
import { AuthRepository } from "../repositories";
// Entities
import { Users } from "../entities";
// JWT
import { JwtPayload } from "src/strategy/interfaces/jwt.model";

@Injectable()
export class AuthService {
    private authRep = getCustomRepository(AuthRepository);

    constructor(
        @InjectRepository(Users)
        private readonly authRepository: Repository<Users>,
        private readonly jwtService: JwtService,
    ) {}

    public async registration(user: IUser): Promise<IUser> {
        const newUser = this.authRep.create();
        await this.authRep.registration(user);
        return;
    }

    public async login(user: ILogin): Promise<{ token: string }> {
        let isUser: Users;
        let match;
        await this.authRep.findByName(user.userName).then((res) => {
            isUser = res;
        });

        if (isUser) {
            match = await bcrypt.compare (user.userPassword, isUser.userPassword);
        }

        if (isUser === undefined) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Password is worng',
            }, 400);
        }

        if (!match) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Password is worng',
            }, 403);
        }

        if (isUser && match) {
            const userPayload: JwtPayload = {
                idUser: isUser.idUser,
                userName: isUser.userName,
                userEmail: isUser.userEmail,
            };
            const token = await this.jwtService.sign(userPayload);
            console.log(token)
            return { token };
        }
    }
}