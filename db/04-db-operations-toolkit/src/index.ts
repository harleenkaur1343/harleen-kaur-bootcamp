import express from "express";
import adminRoutes from "./admin/db-status.route";
const app = express();

app.use("/health", adminRoutes); 

app.listen(4000,()=>{
   console.log("Listening on localhost:4000");
})

