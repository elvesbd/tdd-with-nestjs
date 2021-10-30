import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CurrenciesInputDto {
  @IsNotEmpty()
  @Length(3, 3)
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;
}
