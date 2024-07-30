import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as bodyParser from "body-parser";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    app.enableCors({
        allowedHeaders: "*",
        origin: "*",
        credentials: true,
    });
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );
    await app.listen(3000);
}
bootstrap();
