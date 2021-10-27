import { BadRequestException, Injectable } from '@nestjs/common';
import { CurrenciesService } from '../currencies/currencies.service';
import { ExchangeInput } from './types/exchange-input.types';
import { OutPut } from './types/exchange-output.type';

@Injectable()
export class ExchangeService {
  constructor(private currenciesService: CurrenciesService) {}

  async convertAmount({ from, to, amount }: ExchangeInput): Promise<OutPut> {
    if (!from || !to || !amount) {
      throw new BadRequestException();
    }

    try {
      const currencyFrom = await this.currenciesService.getCurrency(from);
      const currencyTo = await this.currenciesService.getCurrency(to);

      return { amount: (currencyFrom.value / currencyTo.value) * amount };
    } catch (error) {
      throw new Error();
    }
  }
}
