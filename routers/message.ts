import express from 'express';
import {promises as fs} from "fs";
import {IMessages} from "../types";

const messageRouter = express.Router();
const path = "message"


messageRouter.get("/", async(req, res) => {
    const allMessages:IMessages[] = []
    const files = await fs.readdir("message")
    for (const file of files) {
        const fileContent = await fs.readFile(path + "/" + file)
        const result = JSON.parse(fileContent.toString())
        allMessages.push(result)
    }
    res.send(allMessages.reverse().slice(0, 5));
});

messageRouter.post("/", async(req, res)=>{
    const message:IMessages = {
        message: req.body.message,
        date: new Date().toISOString(),
    }
    await fs.writeFile(`${path}/${message.date}.txt`, JSON.stringify(message));
    res.send(message)
})

export default messageRouter;