import { Router } from 'express';
import {
  list
} from "../controller/game.controller.js";
//import { listGames, allGames, createGames, modifyGames, deleteGames } from '../controller/game.controller.js';

const router = Router();

router.get('/', list);
// router.get('/:id', allGames);
// router.get('/', createGames);
// router.get('/:id', modifyGames);
// router.get('/:id', deleteGames);

export default router;