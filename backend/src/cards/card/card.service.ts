import { Injectable } from "@nestjs/common";
import { Card, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CardService {
    constructor(private prismaService: PrismaService) {}

    async createCard(data: { name: string; author: string; price: number; image: Buffer; cardTypeId: number }) {
        return this.prismaService.card.create({
            data: {
                name: data.name,
                author: data.author,
                price: data.price,
                image: data.image,
                cardTypeId: data.cardTypeId,
            },
        });
    }

    async getCardById(id: string): Promise<Card | null> {
        return this.prismaService.card.findUnique({ where: { id } });
    }

    async updateCard(id: string, data: Prisma.CardUpdateInput): Promise<Card> {
        return this.prismaService.card.update({ where: { id }, data });
    }

    async deleteCard(id: string): Promise<Card> {
        return this.prismaService.card.delete({ where: { id } });
    }

    async getAllCards(): Promise<Card[]> {
        return this.prismaService.card.findMany();
    }
}
