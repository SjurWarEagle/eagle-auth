import {Controller, Get, Query} from '@nestjs/common';
import {Role} from "../role.enum";
import {promises} from "fs";
import {PermissionConfig} from "../types/permission-config";
import {HeaderDataService} from "../services/header-data.service";

@Controller('/v1/auth')
export class AppController {
    constructor(private readonly headerDataService:HeaderDataService) {
    }

    @Get('/roles')
    public async getRoles(@Query('authHeader') authHeader: string): Promise<string[]> {
        let rc = [];
        console.log('authHeader', authHeader);
        if (!authHeader && process.env.ENVIRONMENT && process.env.ENVIRONMENT === 'development') {
            rc.push(...Object.keys(Role).filter((item) => {
                return isNaN(Number(item));
            }));
            return rc;
        }
        if (!authHeader) {
            return rc;
        }

        const authHeaderTrimmed = await this.headerDataService.removeNotWanted(authHeader);
        console.log('authHeaderTrimmed', authHeaderTrimmed);

        const [username, password] = Buffer.from(authHeaderTrimmed, 'base64')
            .toString()
            .split(':');

        console.log('username', username);
        //console.log('password', password);

        // reading the file each time, so that it can be changed and changes are active instantly.
        const fileContent = await promises.readFile(process.env.FILE_PERMISSIONS);
        const permissions: PermissionConfig[] = JSON.parse(Buffer.from(fileContent).toString());

        for (let permission of permissions) {
            if (permission.user === username) {
                return permission.roles;
            }
        }

        return rc;
    }

}
