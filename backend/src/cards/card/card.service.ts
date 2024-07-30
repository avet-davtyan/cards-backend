import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    PayloadTooLargeException,
} from "@nestjs/common";
import { Card, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCardDto, UpdateCardDto } from "./dtos/CreateCard.dto";
import { extname, join } from "path";
import * as fs from "fs";

@Injectable()
export class CardService {
    private extensions: string[];
    constructor(private prismaService: PrismaService) {
        this.extensions = ["png", "jpg", "jpeg"];
    }

    async createCard(image: Express.Multer.File, createCardDto: CreateCardDto) {
        if (this.extensions.includes(extname(image.originalname))) {
            throw new BadRequestException("wrong file type");
        }
        if (image.size > 2048 * 2048) {
            throw new PayloadTooLargeException("Image is too large");
        }

        const createdCard = await this.prismaService.card.create({
            data: {
                ...createCardDto,
            },
        });

        const cardDir = join(process.env.CARD_IMAGES, createdCard.id.toString());
        console.log(createdCard);

        try {
            await fs.mkdirSync(cardDir, { recursive: true });

            const imageDir = "card" + ".jpg";
            const imagePath = join(cardDir, imageDir);
            const imagePathDb = join(createdCard.id.toString(), imageDir);

            await fs.writeFileSync(imagePath, image.buffer);

            const card = await this.prismaService.card.update({
                where: {
                    id: createdCard.id,
                },
                data: {
                    image: imagePathDb,
                    pending: false,
                },
            });
            return card;
        } catch (error) {
            console.error("Error while creating card", error);

            await this.prismaService.card.delete({
                where: {
                    id: createdCard.id,
                },
            });
            await fs.rmSync(cardDir, { recursive: true, force: true });
            throw error;
        }
    }

    async updateCard(id: string, image: Express.Multer.File | null, updateCardDto: UpdateCardDto) {
        // Validate card existence
        const existingCard = await this.prismaService.card.findUnique({
            where: { id },
        });

        if (!existingCard) {
            throw new NotFoundException(`Card with id ${id} not found`);
        }

        if (image) {
            // Validate the image file
            if (this.extensions.includes(extname(image.originalname))) {
                throw new BadRequestException("Wrong file type");
            }
            if (image.size > 2048 * 2048) {
                throw new PayloadTooLargeException("Image is too large");
            }

            // Remove the old image if it exists
            if (existingCard.image) {
                const oldImagePath = join(process.env.CARD_IMAGES, existingCard.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.rmSync(oldImagePath, { recursive: true, force: true });
                }
            }

            // Save the new image
            const cardDir = join(process.env.CARD_IMAGES, id);
            try {
                await fs.mkdirSync(cardDir, { recursive: true });

                const imageDir = "card.jpg"; // Use a consistent name for the image
                const imagePath = join(cardDir, imageDir);
                const imagePathDb = join(id, imageDir);

                await fs.writeFileSync(imagePath, image.buffer);
            } catch (error) {
                console.error("Error while updating card image", error);
                throw error;
            }
        }

        // Update the card details
        const updatedCard = await this.prismaService.card.update({
            where: { id },
            data: {
                ...updateCardDto,
                image: image ? join(id, "card.jpg") : existingCard.image, // Preserve old image path if no new image
            },
        });

        return updatedCard;
    }

    async getCardById(id: string): Promise<Card> {
        const card = await this.prismaService.card.findUnique({ where: { id } });
        if (!card) {
            throw new NotFoundException("card is not fonud");
        }
        return card;
    }

    async deleteCard(id: string): Promise<Card> {
        const card = await this.prismaService.card.findUnique({
            where: {
                id,
                pending: false,
            },
        });
        if (card === null) {
            throw new NotFoundException("Card is not found");
        }
        const cardDir = join(process.env.CARD_IMAGES, card.id.toString());

        await this.prismaService.$transaction(async (prisma) => {
            await prisma.usersCards.deleteMany({
                where: {
                    cardId: id,
                },
            });

            await prisma.card.delete({
                where: {
                    id,
                },
            });
        });

        try {
            await fs.rmSync(cardDir, { recursive: true, force: true });
        } catch (error) {
            throw new InternalServerErrorException("The deletion process is incomplete");
        }

        return card;
    }

    async getAllCards(): Promise<Card[]> {
        return this.prismaService.card.findMany();
    }
}
