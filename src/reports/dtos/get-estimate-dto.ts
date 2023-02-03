import { Transform } from 'class-transformer';
import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
} from 'class-validator';

export class GetEstimateDto {
  @IsString()
  model: string;

  @IsString()
  make: string;

  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @IsLongitude()
  lng: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @IsLatitude()
  lat: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;
}
