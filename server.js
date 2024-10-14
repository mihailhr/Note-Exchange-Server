const express=require("express")
require("dotenv").config()
const {Pool}=require("pg")
const app=express()
const port=3000


const pool=new Pool({
    connectionString:process.env.CONNECTION_STRING,
    ssl:{
        rejectUnauthorized:false
    }
})

// app.get("/",(req,res)=>{
//     try {
//         res.status(200).send("Test endpoint is working")
//     } catch (error) {
//         res.status(400).send("Problem occurred")
//     }
// })

// app.get("/createUsersTable",async(req,res)=>{
//     try {
//         const client =await pool.connect()
//         const result=await client.query(`
//             CREATE TABLE IF NOT EXISTS Users(
//             User_id SERIAL PRIMARY KEY,
//             Username VARCHAR(15))`)
//         res.send("Created Users table")
//         await client.release()
//     } catch (error) {
//         console.log(error)
//         res.send("Something went wrong: " + error)
//     }
// })

// app.get("/insertFirstUsers",async (req,res)=>{
//     try {
//         const client=await pool.connect()
//         const result=await client.query("INSERT INTO Users (Username) VALUES ('Mihail'), ('George')")
//         res.send("Added first users")
//         client.release()
//     } catch (error) {
//         console.log(error)
//         res.send("Problem occurred: " + error)
//     }
// })

// app.get("/resources",async(req,res)=>{
//     try {
//         const client=await pool.connect()
//         const result=await client.query("CREATE TABLE IF NOT EXISTS Submissions (post_id SERIAL PRIMARY KEY, post_name VARCHAR(30))")
//         res.send("Created submissions table")
//         client.release()
//     } catch (error) {
//         console.log(error)
//         res.send("Problem occurred: " + error)
//     }
// })
// app.get("/addResources",async(req,res)=>{
//     try {
//         const client=await pool.connect()
//         const result=await client.query("INSERT INTO Submissions (post_name) VALUES ('Economics basics'),('Mathematics')")
//         res.send("Inserted into submissions table")
//         client.release()
//     } catch (error) {
//         console.log(error)
//         res.send("Problem occurred: " + error)
//     }

// })

app.get("/latestSubmissions",async(req,res)=>{
    try {
        const client=await pool.connect()
        const response=await client.query("SELECT post_name FROM Submissions")
        res.send(JSON.stringify(response.rows))
        client.release()
    } catch (error) {
        console.log(error)
        res.send("Problem occurred: " + error)
    }
})


try {
    app.listen(port)
    console.log("Server is running on port 3000")
} catch (error) {
    console.log("Error occurred: " + error)
}