import {Controller, Get, Query} from '@nestjs/common';
import {AppService} from '../services/app.service';
import {Role} from "../role.enum";
import {promises} from "fs";

@Controller()
@Controller('/v1/auth')
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get('/roles')
    public async getRoles(@Query('authHeader') authHeader: string): Promise<string[]> {
        console.log('authHeader', authHeader);

        const [username, password] = Buffer.from(authHeader, 'base64')
            .toString()
            .split(':');

        console.log('username', username);
        //console.log('password', password);

        const fileContent = await promises.readFile(process.env.FILE_PERMISSIONS);
        const permissions = JSON.parse(Buffer.from(fileContent).toString());
        console.log('fileContent',permissions);

        const rc = Object.keys(Role).filter((item) => {
            return isNaN(Number(item));
        });
        return rc;
    }
}
