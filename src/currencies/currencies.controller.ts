import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
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

  @Get(':currency')
  async getCurrency(@Param('currency') currency: string): Promise<Currencies> {
    return await this.currencyService.getCurrency(currency);
  }

  @Post()
  async createCurrency(
    @Body() currenciesInputDto: CurrenciesInputDto,
  ): Promise<Currencies> {
    return await this.currencyService.createCurrency(currenciesInputDto);
  }

  @Delete(':currency')
  async deleteCurrency(@Param('currency') currency: string) {
    return await this.currencyService.deleteCurrency(currency);
  }
}
