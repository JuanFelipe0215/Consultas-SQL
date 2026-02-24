import "dotenv/config";
import app from "./src/app.js";
import config from "./src/config.js";

app.listen(config.port, () => {
    console.log(`desplegado en http://localhost:${config.port}`);
});