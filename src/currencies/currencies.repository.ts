import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Currencies } from './currencies.entity';
import { CurrenciesInputType } from './types/currencies-input.types';

@EntityRepository(Currencies)
export class CurrenciesRepository extends Repository<Currencies> {
  async getCurrency(currency: string): Promise<Currencies> {
    const result = await this.findOne({ currency });

    if (!result) {
      throw new NotFoundException('Resource not Found');
    }
    return result;
  }

  async createCurrency(currenciesInputType: CurrenciesInputType): Promise<Currencies> {
    const createCurrency = new Currencies();
    /* createCurrency.currency = currenciesInputType.currency;
    createCurrency.value = currenciesInputType.value; */
    // as duas linhas acima podem ser feitas da forma abaixo
    Object.assign(createCurrency, currenciesInputType);

    await this.save(createCurrency);
    return createCurrency;
  }

  async updateCurrency({ currency, value }: CurrenciesInputType): Promise<Currencies> {
    return new Currencies();
  }
  async deleteCurrency(currency: string): Promise<void> {
    return;
  }
}
