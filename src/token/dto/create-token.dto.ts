import { IsBoolean, IsInt, IsOptional, IsString, MinLength, Min } from "class-validator";

export class CreateTokenDto {

    @IsString()
    @MinLength(1)
    token: string;

    @IsOptional()
    @IsBoolean()
    active?: boolean;

    @IsOptional()
    @IsInt()
    @Min(0)
    reqLeft?: number;

}