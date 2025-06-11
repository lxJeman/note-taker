import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter.js"
import cors from "cors"
import path from "path"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5001

const __dirname = path.resolve();
console.log("path: ",__dirname) // Correct path

try { // Work ok
    // Configure CORS before other middleware
    if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    }));
    } else {
    app.use(cors({
        origin: process.env.CLIENT_URL, // Set this in .env (e.g. https://yourdomain.com)
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    }));
    }
    console.log("CORS config is successful")
} catch (error) {
    console.error("Error at CORS config: ", error)
}

app.use(express.json()) //middleware
app.use(rateLimiter)

// app.use((req, res, next) => {
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`)
//     next()
// })

app.use("/api/notes", notesRoutes)

// Serve static files from frontend
app.use(express.static(path.join(__dirname, "../frontend/dist")));
console.log("path2:", path.join(__dirname, "../frontend/dist")); // Correct path

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Catch-all: only serve index.html for non-API, non-static requests
  app.get(/^\/(?!api\/).*/, (req, res) => {
    const indexPath = path.join(__dirname, "../frontend/dist/index.html");
    console.log("Serving index.html from:", indexPath);
    res.sendFile(indexPath);
  });
}



connectDB().then(() => {
    app.listen(5001, () => {
    console.log("server running")
})
})

