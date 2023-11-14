require("express-async-errors");
const cors = require('cors')
const express = require("express");
const routes = require('./routes');
const cookieParser = require("cookie-parser")
const AppError = require("./utils/AppError");
const uploadConfig = require("./configs/upload");

const app = express();
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true
}));
app.use(express.json());
app.use(routes);

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use((error, request, response, next) => {
    if(error instanceof AppError) {
        return response.status(error.statusCode).json( { 
        status: "error",
        message: error.message
        });
    }

    console.error(error);

    return response.status(500).json({
        status: "error",
        message: "internal server error"
   });   
});



const PORT = 4444;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
