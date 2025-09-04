import { BadRequestException, Injectable } from '@nestjs/common'

import { WeatherForecast } from './weather.dto'

@Injectable()
export class WeatherService {
	private readonly summaries = [
		'Freezing',
		'Bracing',
		'Chilly',
		'Cool',
		'Mild',
		'Warm',
		'Balmy',
		'Hot',
		'Sweltering',
		'Scorching'
	]

	getWeatherForecast(): WeatherForecast[] {
		const forecasts: WeatherForecast[] = []
		for (let i = 0; i < 5; i++) {
			const date = new Date()
			date.setDate(date.getDate() + i)
			const temperatureC = Math.floor(Math.random() * 31) - 10 // Случайная температура от -10 до 20
			const summary =
				this.summaries[
					Math.floor(Math.random() * this.summaries.length)
				]

			forecasts.push(new WeatherForecast())
			forecasts[i].date = date.toISOString()
			forecasts[i].temperatureC = temperatureC
			forecasts[i].summary = summary
		}
		return forecasts
	}

	getAll(sortIndex?: number | null): string[] {
		let result = [...this.summaries]

		if (sortIndex === null) {
			return result
		} else if (sortIndex === 1) {
			return result.sort()
		} else if (sortIndex === -1) {
			return result.sort().reverse()
		} else if (sortIndex !== undefined) {
			throw new Error('Некорректное значение параметра sortIndex')
		}

		return result
	}

	createSummary(newSummary: string): string {
		if (newSummary && !this.summaries.includes(newSummary)) {
			this.summaries.push(newSummary)
		}
		return newSummary
	}

	updateSummary(index: number, newSummary: string) {
		if (index < 0 || index >= this.summaries.length) {
			throw new BadRequestException('Такой индекс неверный!!!!')
		}

		this.summaries[index] = newSummary
		return newSummary
	}

	deleteSummary(index: number) {
		if (index < 0 || index >= this.summaries.length) {
			throw new BadRequestException('Такой индекс неверный!!!!')
		}

		const removed = this.summaries.splice(index, 1)[0]
		return removed
	}
}
