import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";



export class AccountRegisterDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
      username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
      password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
      fullname: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
      address: string;
      
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
      phone: string;

}