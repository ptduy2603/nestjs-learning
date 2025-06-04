/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsNotEmpty,
  IsString,
  Length,
  Validate,
  ValidatorConstraintInterface,
  ValidatorConstraint,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsUppercase' })
export class IsUppercase implements ValidatorConstraintInterface {
  validate(value: string, validationArguments: ValidationArguments): boolean {
    console.log(validationArguments);
    return value === value.toUpperCase();
  }

  defaultMessage(): string {
    return 'This field must be uppercase';
  }
}

export class CreateCommentDto {
  @IsNotEmpty({ message: 'Author is required' })
  @IsString()
  @Validate(IsUppercase, [{ test: 'Test argument' }], {
    message: 'Author must be uppercase',
  })
  author: string;

  @IsNotEmpty({ message: 'Content is required' })
  @Length(2, 100, { message: 'Content must be between 2 and 100 characters' })
  @IsString()
  content: string;
}
