import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(
        `Ktxx AI Running On ${PORT}`
    );

});
