const express=require("express")
const cors=require("cors")
const path=require("path")



require("dotenv").config()
const {Pool}=require("pg")
const app=express()
app.set('json spaces', 4)
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))
const port=3000



const pool=new Pool({
    connectionString:process.env.CONNECTION_STRING,
    ssl:{
        rejectUnauthorized:false
    }
})

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'))
})


app.get("/studyResources",async(req,res)=>{
    try {
        const client=await pool.connect()
        const response=await client.query("SELECT * FROM submissions;")
        client.release()
        res.send(response.rows)
    } catch (error) {
        console.error(error)
        res.status(400).send("An error occurred: "+error)
    }
})

app.get("/postResource",(req,res)=>{
    res.sendFile(path.join(__dirname,'public','post.html'))
})







app.post("/postResource",async(req,res)=>{
    const {title,field,url,creator}= (req.body)
    console.log(title,field,url,creator)
    try {
        const client=await pool.connect()
        const insertQuery=`INSERT INTO submissions
        (post_name,field,creator,link)
        VALUES($1,$2,$3,$4);
        `
        const response=await client.query(insertQuery,[title,field,creator,url])
        client.release()
        res.sendFile(path.join(__dirname,'public','successfulSubmission.html'))

    } catch (error) {
        console.error(error)
        res.send("Problem")
    }
})
// async function changeResourcesTable(){
    
//     try {
//         const client=await pool.connect()
//     const response=await client.query("ALTER TABLE submissions ADD link VARCHAR(200)")
//     client.release()
//     console.log('ok')
//     } catch (error) {
//         console.log(error)
//     }
// }
// changeResourcesTable()

try {
    app.listen(port)
    console.log("Server is running on port 3000")
} catch (error) {
    console.log("Error occurred: " + error)
}