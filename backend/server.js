const express = require("express");
const app = express();
const port = 3000

app.listen(port, () => {
    console.log(`Server is running at ${port}`)
})

app.get("todos", (req, res) => {
    res.send("Hello world backend app")
    res.json()
})

// put Api is used to edit

app.put("/about", (req, res) => {
    console.log("put req running")
})

// Post add krta ha

app.post("/contact", (req, res) => {
    console.log("Post request runing")
})