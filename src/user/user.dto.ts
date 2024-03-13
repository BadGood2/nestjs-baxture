import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsOptional()
  @IsString({ each: true })
  hobbies?: string[];
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsString({ each: true })
  hobbies?: string[];
}
