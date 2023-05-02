import { IsArray, IsNotEmpty } from "class-validator";

export class BuyProductsInCartDTO {
    @IsNotEmpty()
    @IsArray()
      listId: number[];
}