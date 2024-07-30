import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CardType } from "@prisma/client";
import { CardTypeService } from "./card-type.service";
import { CreateCardTypeDto, UpdateCardTypeDto } from "./dtos/CreateCardType.dto";

@Controller("card-type")
export class CardTypeController {
    constructor(private cardTypeService: CardTypeService) {}

    @Post()
    create(@Body() createCardTypeDto: CreateCardTypeDto) {
        return this.cardTypeService.create(createCardTypeDto);
    }

    @Get()
    findAll() {
        return this.cardTypeService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.cardTypeService.findOne(+id);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateCardTypeDto: UpdateCardTypeDto) {
        console.log(updateCardTypeDto);
        return this.cardTypeService.update(+id, updateCardTypeDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.cardTypeService.remove(+id);
    }
}
