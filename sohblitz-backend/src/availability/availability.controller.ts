import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { AvailabilityService } from './availability.service';

@Controller('calendar')
export class AvailabilityController {
  constructor(private readonly service: AvailabilityService) {}

  @Post()
  create(@Body() body: any) {
    return this.service.createAvailability(body);
  }

@Get('type/:type')
getByType(@Param('type') type: 'available' | 'blocked') {
  return this.service.getAvailabilitiesByType(type);
}  

  @Get()
  getAll() {
    return this.service.getAvailabilities();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.service.updateAvailability(Number(id), body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.deleteAvailability(Number(id));
  }
}