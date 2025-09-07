import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class WeatherService {
  private readonly summaries: string[] = [
    'Freezing',
    'Bracing',
    'Chilly',
    'Cool',
    'Mild',
    'Warm',
    'Balmy',
    'Hot',
    'Sweltering',
    'Scorching',
  ];

  getAll(sortIndex?: number): string[] {
    let result = [...this.summaries];

    if (sortIndex === undefined) {
      return result;
    }

    if (sortIndex === 1) {
      return result.sort();
    } else if (sortIndex === -1) {
      return result.sort().reverse();
    } else {
      throw new BadRequestException('Некорректное значение параметра sortIndex');
    }
  }

  getSummaryByIndex(index: number): string {
    if (index >= this.summaries.length) {
      throw new BadRequestException('Индекс выходит за пределы массива');
    }
    return this.summaries[index];
  }

  createSummary(summary: string): string[] {
    this.summaries.push(summary);
    return [...this.summaries];
  }

  updateSummary(index: number, newSummary: string): string {
    if (index >= this.summaries.length) {
      throw new BadRequestException('Индекс выходит за пределы массива');
    }
    this.summaries[index] = newSummary;
    return newSummary;
  }

  deleteSummary(index: number): string {
    if (index >= this.summaries.length) {
      throw new BadRequestException('Индекс выходит за пределы массива');
    }
    const deleted = this.summaries.splice(index, 1);
    return deleted[0];
  }

  findByName(name: string): number {
    return this.summaries.filter((s) => s === name).length;
  }
}
