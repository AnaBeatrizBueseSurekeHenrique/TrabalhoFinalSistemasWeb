import { Router } from "express";
import MangasController from "../controllers/MangasController";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import { celebrate, Joi, Segments } from "celebrate";
import MangaCoverController from "../controllers/MangaCoverController";
import multer from "multer";
import uploadConfig from "@config/upload";

const mangasRouter = Router();
const mangasController = new MangasController();
const mangaCoverController = new MangaCoverController();
const upload = multer(uploadConfig);

mangasRouter.use(isAuthenticated);

mangasRouter.patch("/cover/:id", upload.single("cover"),celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  
  async (req, res, next) => {
    try {
      await mangaCoverController.update(req, res, next);
    } catch (err) {
      next(err);
    }
  }
);

mangasRouter.get("/", async (req, res, next) => {
  try {
    await mangasController.index(req, res, next);
  } catch (err) {
    next(err);
  }
});

mangasRouter.get("/:id", celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  async (req, res, next) => {
    try {
      await mangasController.show(req, res, next);
    } catch (err) {
      next(err);
    }
  }
);

mangasRouter.post("/", celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      author_name: Joi.string().required(),
      target_demographic: Joi.string().required(),
      quantity_volumes: Joi.number().required(),
      publisher_name: Joi.string().required(),
    },
  }),
  async (req, res, next) => {
    try {
      await mangasController.create(req, res, next);
    } catch (err) {
      next(err);
    }
  }
);

mangasRouter.put( "/:id", celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    [Segments.BODY]: {
      title: Joi.string().optional(),
      author_name: Joi.string().optional(),
      target_demographic: Joi.string().optional(),
      quantity_volumes: Joi.number().optional(),
      publisher_name: Joi.string().optional(),
    },
  }),

  async (req, res, next) => {
    try {
      await mangasController.update(req, res, next);
    } catch (err) {
      next(err);
    }
  }
);

mangasRouter.delete("/:id", celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  async (req, res, next) => {
    try {
      await mangasController.delete(req, res, next);
    } catch (err) {
      next(err);
    }
  }
);

export default mangasRouter;