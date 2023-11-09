import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolClassService {

  findAll() {
    return `This action returns all toolClass`;
  }

}
