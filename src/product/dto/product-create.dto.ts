import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { IsNotEmpty, IsInt } from 'class-validator';

export class ProductCreateDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
      name: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value))
    @IsInt()
      cost : number;
      
    @ApiProperty()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value))
    @IsInt()
      quantity: number;
    
    @ApiProperty()  
    @IsNotEmpty()
    @IsString()
      type: string;

}