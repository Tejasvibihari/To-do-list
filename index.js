import express from "express";
import bodyParser from "body-parser"

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


let items = ["buy food", "eat food"];

const workTitle = [];
const workItems = [];



app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.post("/", (req, res) => {

    let title = req.body["listTitle"];
    let description = req.body["listItem"];
    //console.log(req.body);
    workTitle.push(title);
    workItems.push(description);
    res.render("index.ejs", { titleoflist: workTitle, listofitem: workItems });
});








app.listen(port, () => {
    console.log("Server started on port" + port);
})