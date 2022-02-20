const router = require("express").Router();
const { Canvas } = require("../models/canvas");

router.post("/", async (req, res) => {
    try {
        let canvas = await Canvas.findOne({ user: req.body.user });
        if (!canvas) {
            canvas = await new Canvas({
                user: req.body.user,
                image: req.body.image
            }).save();

        }

        await Canvas.findOneAndUpdate({ user: req.body.user }, { $set: { image: req.body.image } });
        res
            .status(201)
            .send({ message: "Saved" });
        console.log(req.body.user)
        console.log("saved to db")
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.get("/", async (req, res) => {
    try {
        /* const cursor = Canvas.find().cursor();
        for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
           console.log(doc) // Use `doc`
           res.send(doc) */
        Canvas.find()
            .then(result => {
                console.log('result: ', result)
                res.send(result.length > 0 ? result : 'No Todos');
            })
    }
    catch (error) {

    }
});



module.exports = router;