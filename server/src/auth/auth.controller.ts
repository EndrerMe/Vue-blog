// Vendors
import { Controller, Post, Body } from '@nestjs/common';

// Interfaces
import { IUser, ILogin } from './../core/interfaces';
// Services
import { AuthService } from './../core/services';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
    ) {}

    @Post('registration')
    public async registration(@Body() user: IUser): Promise<IUser> {
        return this.authService.registration(user);
    }

    @Post('login')
    public async login(@Body() user: ILogin): Promise<{token: string}> {
        return this.authService.login(user);
    }

}
