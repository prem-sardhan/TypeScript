import mongoose from "mongoose"

export async function connect(){
    try {
        mongoose.connect(process.env.mongo_url!)
            const connection = mongoose.connection
            connection.on('connected',()=>{
                console.log("data basee connected")
            })

            connection.on('error',(err)=>{
                console.log("Mongo connection error")
                process.exit()
            })
        
    } catch (error) {
        console.log("somethings wrong")
        console.log(error)
        
    }
}