import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

/* CHAT */

app.post("/chat", async (req, res) => {

    try {

        const message = req.body.message;

        const response =
        await openai.chat.completions.create({

            model:"gpt-4o-mini",

            messages:[

                {
                    role:"system",
                    content:`
                    Kamu adalah Ktxx AI,
                    AI modern khusus coding
                    dan website.
                    `
                },

                {
                    role:"user",
                    content:message
                }

            ]

        });

        res.json({

            reply:
            response.choices[0]
            .message.content

        });

    } catch(err){

        res.status(500).json({
            error:"AI Error"
        });

    }

});

const PORT =
process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(
        `Server Running ${PORT}`
    );

});
