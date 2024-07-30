export class CreateCardTypeDto {
    typeDescription: string;
    stars: number;
}

export class UpdateCardTypeDto {
    typeDescription?: string;
    stars?: number;
}
