// Vendors
import { EntityRepository, Repository } from "typeorm";
import { HttpException, HttpStatus } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

// Entities
import { Users } from "../entities";
// Interfaces
import { IUser } from "../interfaces";

@EntityRepository(Users)
export class AuthRepository extends Repository<Users> {

    public async findByName(userName: string): Promise<Users> {
        return await this.findOne({
            where: {
                userName: userName,
            },
        });
    }

    public async findById(idUser: number): Promise<Users> {
        return await this.findOne({
            where: {
                idUser: idUser,
            },
        });
    }

    public async findByEmail(userEmail: string): Promise<Users> {
        return await this.findOne({
            where: {
                userEmail: userEmail,
            },
        });
    }

    public async registration(user: IUser): Promise<Users> {
        const saltRounds: number = 10;
        let isUserName: Users;
        let isUserEmail: Users;
        await this.findByName(user.userName).then((res) => {
            isUserName = res;
        });

        await this.findByEmail(user.userEmail).then((res) => {
            isUserEmail = res;
        });

        if (isUserName !== undefined) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'This username is already in use',
            }, 403);

        }

        if (isUserEmail !== undefined) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'This email is already in use',
            }, 403);
        }

        if (!isUserEmail && !isUserName) {
            const newUser = await bcrypt.hash(user.userPassword, saltRounds, async (err, hash) => {
                user.userPassword = hash;
                await this.save(user);
            });

            return await newUser;
        }
    }
}