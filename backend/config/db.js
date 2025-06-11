import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
        
        // Add connection error handler
        mongoose.connection.on('error', err => {
            console.error('MongoDB connection error:', err)
        })
        
    } catch (error) {
        console.error("MongoDB connection error:", error)
        process.exit(1)
    }
}