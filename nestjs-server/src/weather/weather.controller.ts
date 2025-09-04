import { Controller, Delete, Get, Post, Put, Query } from '@nestjs/common'
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'

import { WeatherForecast } from './weather.dto'
import { WeatherService } from './weather.service'

@ApiTags('weather')
@Controller('weatherforecast')
export class WeatherController {
	constructor(private readonly weatherService: WeatherService) {}

	@Get()
	@ApiResponse({
		status: 200,
		description: 'Возвращает массив прогнозов погоды',
		type: WeatherForecast,
		isArray: true
	})
	getWeatherForecast() {
		return this.weatherService.getWeatherForecast()
	}

	@Get('getAll')
	@ApiQuery({
  name: 'sortIndex',
  required: false,
})

	getAll(@Query('sortIndex') sortIndex?: string) {
		const parsed = sortIndex !== undefined ? Number(sortIndex) : undefined
		return this.weatherService.getAll(parsed)
	}

	@Post()
	@ApiResponse({
		status: 201,
		type: [String]
	})
	createSummary(@Query('name') summary: string) {
		return this.weatherService.createSummary(summary)
	}

	@Put()
	@ApiResponse({
		status: 200,
		description: 'Сводка погоды успешно обновлена.',
		type: String
	})
	updateSummary(
		@Query('index') index: number,
		@Query('newSummary') newSummary: string
	) {
		return this.weatherService.updateSummary(index, newSummary)
	}

	@Delete()
	@ApiResponse({
		status: 200,
		description: 'Сводка погоды была успешно удалена.',
		type: String
	})
	deleteSummary(@Query('index') index: number) {
		return this.weatherService.deleteSummary(index)
	}
}
