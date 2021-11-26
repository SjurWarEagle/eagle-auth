import {Module} from '@nestjs/common';
import {AppController} from './controller/app.controller';
import {AppService} from './services/app.service';
import {HeaderDataService} from "./services/header-data.service";

@Module({
    imports: [],
    controllers: [
        AppController
    ],
    providers: [
        AppService,
        HeaderDataService,
    ],
})
export class AppModule {
}
