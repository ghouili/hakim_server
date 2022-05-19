const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require("path");

const PORT = 4000;

const userRouter = require('./routes/user');
const reclamationtRouter = require('./routes/reclamation');
const suggestiontRouter = require('./routes/suggestion');
const taskRouter = require('./routes/task');

const server = express();

server.use("/uploads/images/", express.static(path.join("uploads", "images")));

server.use(bodyparser.json());
server.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"]
}));
server.get('/', (req, res) => {
    res.send("hello wolrd!")
})

server.use('/user', userRouter);
server.use('/reclamation', reclamationtRouter);
server.use('/suggestion', suggestiontRouter);
server.use('/task', taskRouter);

server.use((req, res, next) => {
    res.status(404).json({success: false, message: "page wasn't found!"})
});

server.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "an unknown error occurred " });
});

mongoose.connect("mongodb+srv://admin:admin@natilait.xqqub.mongodb.net/myFirstDatabase?retryWrites=true&w=majority").then(() => {
    server.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
    })
}).catch((error) => console.log("DB error: " + error))


