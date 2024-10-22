import express from 'express';
import gameRouter from './routes/game.routes.js';
import { PORT } from './configs/enviorment.js';
import connectDB from './configs/mongo.js';


const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(201).send('Conectado!');
});
app.use("/games", gameRouter);

async function startSever() {
  const isConnected = await connectDB();
  if (isConnected) {
    app.listen(PORT, () => {
      console.log(`Server started on ${PORT}`);
    });
  } else {
    process.exit();
  }
}

startSever();
