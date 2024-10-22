import gameModel from "../models/game.model.js";

async function list(req, res) {
  try {
    const games = await gameModel.find();
    return res.status(200).json({
      status: "success",
      games: games,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Ha ocurrido un error en la base de datos",
    });
  }
}

export { list };
