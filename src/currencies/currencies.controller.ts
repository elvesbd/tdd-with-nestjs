import { Controller, Get, Param } from '@nestjs/common';
import { Currencies } from './currencies.entity';
import { CurrenciesService } from './currencies.service';

@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currencyService: CurrenciesService) {}

  @Get(':currency')
  async getCurrency(@Param('currency') currency: string): Promise<Currencies> {
    return await this.currencyService.getCurrency(currency);
  }
}
