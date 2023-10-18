import express from "express";
import bodyParser from "body-parser"
import mongoose, { mongo } from "mongoose";



const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Database Connection 

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB")
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(`There is an ${err}`);
    });

const todolistSchema = new mongoose.Schema({
    title: String,
    description: String
});

const List = mongoose.model("List", todolistSchema);

// const workTitle = [];
// const workItems = [];

// const list1 = new List({
//     title: "work",
//     description: "Make project"
// });
// const list2 = new List({
//     title: "home",
//     description: "Cook food"
// });
// const list3 = new List({
//     title: "shop",
//     description: "Manage Product"
// });

// const defaultList = [list1, list2, list3];

// List.insertMany([list1, list2, list3])
//     .then(() => {
//         console.log('Documents inserted successfully.');
//     })
//     .catch((err) => {
//         console.error(err);
//     });

app.get("/", (req, res) => {

    List.find({})
        .then((foundList) => {
            res.render("index.ejs", { titleoflist: foundList });
        })
        .catch((err) => {
            console.error(err);
        });

})

app.post("/", (req, res) => {

    const title = req.body["listTitle"];
    const description = req.body["listItem"];

    const list = new List({
        title: title,
        description: description
    });

    list.save();
    res.redirect("/");







    //console.log(req.body);
    // workTitle.push(title);
    // workItems.push(description);
    // res.render("index.ejs", { titleoflist: workTitle, listofitem: workItems });
});








app.listen(port, () => {
    console.log("Server started on port" + port);
})