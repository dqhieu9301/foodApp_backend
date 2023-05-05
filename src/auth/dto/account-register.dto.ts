/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, ValidationArguments, ValidationOptions, registerDecorator } from "class-validator";



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
    @IsPhoneNumberVN()
      phone: string;

}

export function IsPhoneNumberVN(validationOptions?: ValidationOptions) {
  return function(object: object, propertyName: string) {
    registerDecorator({
      name: 'isPhoneNumberVN',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const regex = /^(?:\+?84|0)(?:\d){9}$/;
          return regex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid phone number in Vietnam format (10 digits starting with 0)`;
        },
      },
    });
  };
}