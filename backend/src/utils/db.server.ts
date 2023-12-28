// here we interact with our database using prisma
// so, we need to import prisma client
import { logger } from "../configs/logger"

import { PrismaClient } from "@prisma/client"

// we are going to use a singlton instance of prisma client
// we don't want our code to be opening a new prisma client each time
// we are going to connecting to our db

let db: PrismaClient

// now we should make the db a property of the
//global object so what we use is type augmentation

declare global {
    var __db: PrismaClient | undefined
}

// in nodejs the global object == window in js

if (!global.__db) {
    global.__db = new PrismaClient({ log: ["error"] })
    logger.info("Database client is created.")
}

db = global.__db

export { db }
