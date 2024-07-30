import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors, Patch } from "@nestjs/common";
import { CardService } from "./card.service";
import { FileInterceptor, MulterModule } from "@nestjs/platform-express";
import { Prisma, Card } from "@prisma/client";
import { CreateCardDto, UpdateCardDto } from "./dtos/CreateCard.dto";

@Controller("cards")
export class CardController {
    constructor(private cardService: CardService) {}

    @Post()
    @UseInterceptors(FileInterceptor("image"))
    async create(@UploadedFile() image: Express.Multer.File, @Body() createCardDto: CreateCardDto) {
        return this.cardService.createCard(image, createCardDto);
    }

    @Get(":id")
    async findOne(@Param("id") id: string): Promise<Card> {
        return this.cardService.getCardById(id);
    }

    @Patch(":id")
    @UseInterceptors(FileInterceptor("image"))
    async update(
        @Param("id") id: string,
        @UploadedFile() image: Express.Multer.File | null,
        @Body() updateCardDto: UpdateCardDto
    ) {
        return this.cardService.updateCard(id, image, updateCardDto);
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
