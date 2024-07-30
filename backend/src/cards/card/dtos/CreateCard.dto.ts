import { IsInt, IsString, IsOptional } from "class-validator";
import { Transform } from "class-transformer";

export class CreateCardDto {
    @IsString()
    name: string;

    @IsString()
    author: string;

    @IsInt()
    @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
    price: number;

    @IsInt()
    @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
    cardTypeId: number;
}

export class UpdateCardDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    author?: string;

    @IsOptional()
    @IsInt()
    @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
    price?: number;

    @IsOptional()
    @IsInt()
    @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
    cardTypeId?: number;
}
