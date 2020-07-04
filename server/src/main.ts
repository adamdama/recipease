import { sync as findUpSync } from "find-up";
import { config } from "dotenv";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import * as helmet from "helmet";
import { AppModule } from "./app.module";

if (process.env.NODE_ENV !== "production") {
    config({
        path: findUpSync(".env")
    });
}

const { SERVER_PORT = 3000 } = process.env;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Add security package
    app.use(helmet());

    // Enable CORS
    // TODO: should we be more specific about allowed domains?
    app.enableCors();

    // TODO: comment about what this does
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(SERVER_PORT);

    // eslint-disable-next-line no-console
    console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
});
