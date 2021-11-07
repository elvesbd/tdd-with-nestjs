import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Currencies } from './currencies.entity';
import { CurrenciesService } from './currencies.service';
import { CurrenciesInputDto } from './dto/currencies-input.dto';

@UsePipes(ValidationPipe)
@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currencyService: CurrenciesService) {}
  private logger = new Logger(CurrenciesController.name);

  @Get(':currency')
  async getCurrency(@Param('currency') currency: string): Promise<Currencies> {
    this.logger.log(currency);
    return await this.currencyService.getCurrency(currency);
  }

  @Post()
  async createCurrency(
    @Body() currenciesInputDto: CurrenciesInputDto,
  ): Promise<Currencies> {
    return await this.currencyService.createCurrency(currenciesInputDto);
  }

  @Patch(':currency')
  async updateCurrency(
    @Param('currency') currency: string,
    @Body('value') value: number,
  ): Promise<Currencies> {
    return await this.currencyService.updateCurrency({ currency, value });
  }

  @Delete(':currency')
  async deleteCurrency(@Param('currency') currency: string) {
    return await this.currencyService.deleteCurrency(currency);
  }
}
