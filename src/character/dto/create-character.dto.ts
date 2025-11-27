import { IsBoolean, IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class CreateCharacterDto {
	@IsString()
	@MinLength(1)
	name: string;

	@IsInt()
	@Min(0)
	salary: number;

	@IsBoolean()
	employee: boolean;

	@IsOptional()
	@IsInt()
	ownershipId?: number;
}
