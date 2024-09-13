import express, { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import Routes from "./routes/index.js"
const app: Application = express();
const PORT = process.env.PORT || 7000;

// * Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  return res.send("It's working 🙌");
});

//Routes
app.use("/api", Routes)

// Start the server and handle EADDRINUSE error
const startServer = (port: number) => {
  app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is in use, trying another port...`);
      startServer(port + 1); // Increment the port number and retry
    } else {
      console.error('Server failed to start', err);
    }
  });
};

startServer(Number(PORT));
