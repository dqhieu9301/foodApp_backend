import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";

export class CartProductUpdateDTO {
    @ApiProperty()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value))
    @IsInt()
      quantity: number;
}