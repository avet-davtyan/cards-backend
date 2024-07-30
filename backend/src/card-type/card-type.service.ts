import { Injectable } from "@nestjs/common";
import { CardType } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCardTypeDto, UpdateCardTypeDto } from "./dtos/CreateCardType.dto";

@Injectable()
export class CardTypeService {
    constructor(private prismaService: PrismaService) {}

    async create(createCardTypeDto: CreateCardTypeDto) {
        return this.prismaService.cardType.create({ data: createCardTypeDto });
    }

    async findAll() {
        return this.prismaService.cardType.findMany();
    }

    async findOne(id: number) {
        return this.prismaService.cardType.findUnique({ where: { id } });
    }

    async update(id: number, updateCardTypeDto: UpdateCardTypeDto) {
        console.log(updateCardTypeDto);
        return this.prismaService.cardType.update({
            where: { id },
            data: updateCardTypeDto,
        });
    }

    async remove(id: number) {
        return this.prismaService.cardType.delete({ where: { id } });
    }
}
