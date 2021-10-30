import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
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

    try {
      await validateOrReject(createCurrency);
      await this.save(createCurrency);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return createCurrency;
  }

  async updateCurrency({ currency, value }: CurrenciesInputType): Promise<Currencies> {
    const result = await this.findOne({ currency });

    if (!result) {
      throw new NotFoundException(`The currency ${currency} not foundFound`);
    }

    return new Currencies();
  }
  async deleteCurrency(currency: string): Promise<void> {
    return;
  }
}
