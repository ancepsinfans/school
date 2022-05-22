import MongoStore from "connect-mongo";
import { getMongoClient } from "./database";

const mongoStore = MongoStore.create({
    clientPromise: getMongoClient(),
    stringify: false,
})

const getSession = nextSession({
    store: promisifyStore(mongoStore),
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 2 * 7 * 24 * 60 * 60,
        path: '/',
        sameSite: 'strict',
    },
    touchAfter: 1 * 7 * 24 * 60 * 60,
})

export default async function session(req,res,next) {
    await getSession(req,res)
    next()
}