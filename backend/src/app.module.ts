import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CardModule } from "./cards/card/card.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
    imports: [PrismaModule, CardModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
