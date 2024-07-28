import { CardType, Prisma } from "@prisma/client";

export class CreateCardDto {
    name: string;
    author: string;
    price: number;
    cardTypeId: number;
}
