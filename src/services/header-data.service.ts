import { Injectable } from '@nestjs/common';

@Injectable()
export class HeaderDataService {
  public async removeNotWanted(authHeader: string): Promise<string> {
    if (!authHeader) {
      return authHeader;
    }

    return authHeader.replace(/^Basic /ig,'');
  }
}
