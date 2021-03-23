import Joi from "joi";
import * as service from "./service";

export const getRecord = async (req, res, next) => {
  try {
    return res.status(200).json(await service.getRecord(req.body));
  } catch (err) {
    next(err);
  }
};
