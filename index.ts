import express from "express";
import messageRouter from "./routers/message";

const app = express();
const port =  8000

app.use(express.json());
app.use("/messages", messageRouter);

const run = async()=>{

    app.listen(port, ()=>{
        console.log(`Server running on port ${port}`);
    })
}
run().catch(console.error);