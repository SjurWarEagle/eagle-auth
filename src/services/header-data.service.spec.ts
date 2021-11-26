import {HeaderDataService} from "./header-data.service";

describe('HeaderDataService', () => {

    it('removeNotWanted undefined', async () => {
        const service = new HeaderDataService();
        const rc = await service.removeNotWanted(undefined);
        expect(rc).toBeUndefined();
    });

    it('removeNotWanted normal', async () => {
        const service = new HeaderDataService();
        const rc = await service.removeNotWanted('Basic d2FyZWFnbGU6YXJhZ29ybg==');
        expect(rc).toBe('d2FyZWFnbGU6YXJhZ29ybg==');
    });

    it('removeNotWanted already stripped', async () => {
        const service = new HeaderDataService();
        const rc = await service.removeNotWanted('d2FyZWFnbGU6YXJhZ29ybg==');
        expect(rc).toBe('d2FyZWFnbGU6YXJhZ29ybg==');
    });
})
