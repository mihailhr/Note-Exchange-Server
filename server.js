const express=require("express")

const app=express()
const port=3000



app.get("/",(req,res)=>{
    try {
        res.status(200).send("Test endpoint is working")
    } catch (error) {
        res.status(400).send("Problem occurred")
    }
})


try {
    app.listen(port)
    console.log("Server is running on port 3000")
} catch (error) {
    console.log("Error occurred: " + error)
}