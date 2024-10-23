import { Router } from 'express';
import {
  list,
  detail,
  create,
  modify,
  remove,
} from "../controller/game.controller.js";

const router = Router();

router.get('/', list);
router.get("/:id", detail);
router.post('/', create);
router.put('/:id', modify);
router.delete('/:id', remove);

export default router;