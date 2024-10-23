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

async function detail(req, res) {
  try {
    // Obtener el ID
    const gameId = req.params.id;

    // Buscar juego por ID
    const game = await gameModel.findById(gameId);

    if (!game) {
      return res.status(400).send({
        status: "error",
        message: "El juego no existe",
      });
    }

    return res.status(200).send({
      status: "success",
      message: "¡El juego ha sido encontrado!",
      game: game,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ error: "Ha ocurrido un error en la base de datos" });
  }
}

async function create(req, res) {
  try {
    let params = req.body;

    // Obtención de juegos existentes
    let existingGames = await gameModel.find({
      $or: [{ name: params.name }],
    });

    // Validación de juego ya registrado
    if (existingGames && existingGames.length >= 1) {
      return res.status(400).send({
        status: "error",
        message: "¡El juego ya existe!",
      });
    } else {
      // Crear un nuevo objeto juego con sus parámetros
      let newGame = new gameModel(params);

      // Guardar juego en la base de datos
      await newGame.save();

      return res.status(200).send({
        status: "success",
        message: "¡El juego se ha registrado correctamente!",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ error: "Ha ocurrido un error en la base de datos" });
  }
}

async function modify(req, res) {
  try {
    const gameId = req.params.id;
    const gameToUpdate = req.body;

    // Buscar y actualizar
    let gameUpdated = await gameModel.findByIdAndUpdate(
      gameId,
      gameToUpdate,
      { new: true }
    );

    if (!gameUpdated) {
      return res
        .status(500)
        .send({ error: "Ha ocurrido un error al actualizar" });
    }

    return res.status(200).send({
      status: "success",
      message: "¡El juego se ha actualizado correctamente!",
      gameUpdated,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ error: "Ha ocurrido un error en la base de datos" });
  }
}

async function remove(req, res) {
  try {
    // Obtener el ID
    const gameId = req.params.id;

    // Buscar juego por ID
    const game = await gameModel.findById(gameId);

    if (!game) {
      return res.status(400).send({
        status: "error",
        message: "No se ha eliminado el juego",
      });
    }

    await gameModel.findOneAndDelete(game);

    return res.status(200).send({
      status: "success",
      message: "¡El juego ha sido eliminado correctamente!",
      game: gameId,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ error: "Ha ocurrido un error en la base de datos" });
  }
}

export { list, detail, create, modify, remove };
