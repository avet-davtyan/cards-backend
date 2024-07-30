import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CardModule } from "./cards/card/card.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { CardTypeModule } from './card-type/card-type.module';

@Module({
    imports: [
        PrismaModule,
        CardModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "..", process.env.CARD_IMAGES),
            serveRoot: `/${process.env.CARD_IMAGES}`,
        }),
        CardTypeModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
