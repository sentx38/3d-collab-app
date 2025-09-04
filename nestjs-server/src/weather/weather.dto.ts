import { ApiProperty } from '@nestjs/swagger'

export class WeatherForecast {
	@ApiProperty()
	date: string

	@ApiProperty()
	temperatureC: number

	@ApiProperty()
	summary: string
}
