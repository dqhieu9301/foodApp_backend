import { IsInt, IsNotEmpty, IsString } from "class-validator";
import { Transform } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";

export class CartProductCreateDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
      name: string;

    @ApiProperty()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value))
    @IsInt()
      cost: number;

    @ApiProperty()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value))
    @IsInt()
      quantity: number;
}