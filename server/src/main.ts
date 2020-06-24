/* eslint-disable no-console */
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { config } from "dotenv";
import { AppModule } from "./app.module";

config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);

    console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().catch((err) => {
    console.error(err);
});
