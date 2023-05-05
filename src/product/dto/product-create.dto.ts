import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Min } from 'class-validator';
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
    @Min(1000)
      cost : number;
      
    @ApiProperty()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value))
    @IsInt()
    @Min(0)
      quantity: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
      describe: string;
    
    @ApiProperty()  
    @IsNotEmpty()
    @IsString()
      type: string;

}