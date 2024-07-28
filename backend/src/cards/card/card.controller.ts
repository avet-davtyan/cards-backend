import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CardService } from "./card.service";
import { FileInterceptor, MulterModule } from "@nestjs/platform-express";
import { Prisma, Card } from "@prisma/client";
import { CreateCardDto } from "./dtos/CreateCard.dto";

@Controller("card")
export class CardController {
    constructor(private cardService: CardService) {}

    @Post()
    @UseInterceptors(FileInterceptor("image"))
    async create(@UploadedFile() file: Express.Multer.File, @Body() createCardDto: CreateCardDto) {
        createCardDto.price = Number(createCardDto.price);
        createCardDto.cardTypeId = Number(createCardDto.cardTypeId);
        return this.cardService.createCard({ ...createCardDto, image: file.buffer });
    }

    @Get(":id")
    async findOne(@Param("id") id: string): Promise<Card | null> {
        return this.cardService.getCardById(id);
    }

    @Put(":id")
    async update(@Param("id") id: string, @Body() updateCardDto: Prisma.CardUpdateInput): Promise<Card> {
        return this.cardService.updateCard(id, updateCardDto);
    }

    @Delete(":id")
    async remove(@Param("id") id: string): Promise<Card> {
        return this.cardService.deleteCard(id);
    }

    @Get()
    async findAll(): Promise<Card[]> {
        return this.cardService.getAllCards();
    }
}
