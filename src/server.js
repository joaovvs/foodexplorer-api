const express = require("express");

const app = express();

app.use(express.json());

const PORT = 4444;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
