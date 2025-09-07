import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Delete,
  Put,
  Post,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiResponse, ApiQuery } from '@nestjs/swagger';
import { WeatherService } from './weather.service';

@Controller('weatherforecast')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('all')
  @ApiQuery({
    name: 'sortIndex',
    required: false,
    type: String,
    description: 'Сортировка: 1 = по возрастанию, -1 = по убыванию',
  })
  @ApiResponse({ status: 200, type: [String] })
  getAll(@Query('sortIndex') sortIndex?: string) {
    const parsed =
      sortIndex !== undefined && sortIndex !== ''
        ? Number(sortIndex)
        : undefined;

    return this.weatherService.getAll(parsed);
  }

  @Get('summaries/:index')
  @ApiResponse({ status: 200, type: String })
  getSummaryByIndex(@Param('index', ParseIntPipe) index: number) {
    if (index < 0) {
      throw new BadRequestException('Индекс не может быть отрицательным');
    }
    return this.weatherService.getSummaryByIndex(index);
  }

  @Post('summaries')
  @ApiQuery({
    name: 'name',
    required: true,
    type: String,
    description: 'Новое значение summary',
  })
  @ApiResponse({ status: 201, type: [String] })
  createSummary(@Query('name') summary: string) {
    if (!summary) {
      throw new BadRequestException('Имя не может быть пустым');
    }
    return this.weatherService.createSummary(summary);
  }

  @Put('summaries')
  @ApiResponse({ status: 200, type: String })
  updateSummary(
    @Query('index', ParseIntPipe) index: number,
    @Query('newSummary') newSummary: string,
  ) {
    if (index < 0) {
      throw new BadRequestException('Индекс не может быть отрицательным');
    }
    if (!newSummary) {
      throw new BadRequestException('Новое значение не может быть пустым');
    }
    return this.weatherService.updateSummary(index, newSummary);
  }

  @Delete('summaries/:index')
  @ApiResponse({ status: 200, description: 'Удалено успешно' })
  deleteSummary(@Param('index', ParseIntPipe) index: number) {
    if (index < 0) {
      throw new BadRequestException('Индекс не может быть отрицательным');
    }
    return this.weatherService.deleteSummary(index);
  }

  @Get('find-by-name')
  @ApiQuery({
    name: 'name',
    required: true,
    type: String,
    description: 'Имя для поиска',
  })
  @ApiResponse({ status: 200, type: Number })
  findByName(@Query('name') name: string) {
    if (!name) {
      throw new BadRequestException('Имя не может быть пустым');
    }
    return this.weatherService.findByName(name);
  }
}
