import { IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class CreateLocationDto {
	@IsString()
	@MinLength(1)
	name: string;

	@IsString()
	@MinLength(1)
	type: string;

	@IsInt()
	@Min(0)
	cost: number;

	@IsOptional()
	@IsInt()
	ownerId?: number;
}
