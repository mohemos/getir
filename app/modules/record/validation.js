import Joi from "joi";

export default {
  getRecord: {
    body: {
      schema: Joi.object({
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        minCount: Joi.number().required(),
        maxCount: Joi.number().required(),
      }),
    },
  },
};
