import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginateDto {
  @IsOptional()
  @Transform((data) => Number(data.value))
  @IsInt()
  @Min(0)
  skip?: number;

  @IsOptional()
  @Transform((data) => Number(data.value))
  @IsInt()
  @IsPositive()
  take?: number;
}
