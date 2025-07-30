import express from "express";
const app = express();
const port = 3000;

import livroRoutes from "./routes/livroRoutes.js";

app.use(express.json());
app.use("/", livroRoutes);

app.listen(port, ()=> {
    console.log(`servidor online em http://localhost:${port}`); 
})