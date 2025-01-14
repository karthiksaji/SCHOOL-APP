import { Controller, Get ,All} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  // @All('*')
  // handleInvalidUrl() {
  //   return {
  //     statusCode: 404,
  //     message: '🚫🚫🚫🚫🚫Nokiyum Kandum URL adikada 🚫🚫🚫🚫🚫🚫🚫',
  //     error: 'Not Found',
  //   };
  // }
}
