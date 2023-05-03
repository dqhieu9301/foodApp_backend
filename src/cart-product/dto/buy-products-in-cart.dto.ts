import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty } from "class-validator";

export class BuyProductsInCartDTO {
  @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    listId: number[];
}