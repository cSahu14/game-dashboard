const mongoose = require("mongoose")

const connectionDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB started on ${conn.connection.host}`.cyan.underline)
    } catch (error) {
       console.log(error) 
       process.exit()
       
    }
}

module.exports = connectionDB