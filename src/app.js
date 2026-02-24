import express from "express";
import level1Routes from "./routes/level1.routes.js";
import level2Routes from "./routes/level2.routes.js";
import level3Routes from "./routes/level3.routes.js";
import level4Routes from "./routes/level4.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

// app de express -> utilizar metodos es un manipulador de peticiones https (req, res)
const app = express();

app.use(express.json());
app.use('/level1', level1Routes);
app.use('/level2', level2Routes);
app.use('/level3', level3Routes);
app.use('/level4', level4Routes);

app.use(errorHandler)
export default app; 