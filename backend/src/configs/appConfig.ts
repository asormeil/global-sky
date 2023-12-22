import * as dotenv from "dotenv";

dotenv.config();

if (!process.env.PORT) {
    console.error(`PORT not found to set up, shutting down ...`);
    process.exit(1);
}

if (!process.env.ADMIN_EMAIL) {
    console.error(`admin email not found to set up, shutting down ...`);
    process.exit(1);
}

if (!process.env.ADMIN_PASSWORD) {
    console.error(`admin password not found to set up, shutting down ...`);
    process.exit(1);
}

if (!process.env.JWT_SECRET_KEY) {
    console.error(`jwt secret code not found to set up, shutting down ...`);
    process.exit(1);
}

process.on("uncaughtException", (error) => {
    console.error(`Unexpected error: ${error}, shutting down ...`);
    process.exit(1);
});

process.on("unhandledRejection", (error) => {
    console.error(`Unexpected rejection: ${error}, shutting down ...`);
    process.exit(1);
});

export const PORT: number = parseInt(process.env.PORT as string, 10);
