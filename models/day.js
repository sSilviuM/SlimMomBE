const Joi = require("joi");
const { Schema, model } = require("mongoose");

const { handleSaveErrors } = require("../helpers");

const daySchema = new Schema({
  date: String,
  eatenProducts: [
    {
      title: String,
      weight: Number,
      kcal: Number,
      id: String,
      _id: false,
      groupBloodNotAllowed: {},
    },
  ],
  daySummary: { type: Schema.Types.ObjectId, ref: "Summary" },
});

daySchema.post("save", handleSaveErrors);

const Day = model("day", daySchema);

const addProductSchema = Joi.object({
  date: Joi.string()
    .custom((value, helpers) => {
      const dateRegex = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/;
      const isValidDate = dateRegex.test(value);
      if (!isValidDate) {
        return helpers.message({
          custom: "Invalid 'date'. Use YYYY-MM-DD string format",
        });
      }
      return value;
    })
    .required(),
  productId: Joi.string().required(),
  weight: Joi.number().min(1).max(3000).required(),
});

const getProductSchema = Joi.object({
  date: Joi.string()
    .custom((value, helpers) => {
      const dateRegex = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/;
      const isValidDate = dateRegex.test(value);
      if (!isValidDate) {
        return helpers.message({
          custom: "Invalid 'date'. Use YYYY-MM-DD string format",
        });
      }
      return value;
    })
    .required(),
});

const deleteProductSchema = Joi.object({
  dayId: Joi.string().required(),
  eatenProductId: Joi.string().required(),
});

const getDayInfoScheme = Joi.object({
  date: Joi.string()
    .custom((value, helpers) => {
      const dateRegex = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/;
      const isValidDate = dateRegex.test(value);
      if (!isValidDate) {
        return helpers.message({
          custom: "Invalid 'date'. Use YYYY-MM-DD string format",
        });
      }
      return value;
    })
    .required(),
});

const searchQuerySchema = Joi.object({
  search: Joi.string().min(1).max(45).required(),
});

const schemas = {
  addProductSchema,
  deleteProductSchema,
  getDayInfoScheme,
  searchQuerySchema,
  getProductSchema,
};

module.exports = {
  Day,
  schemas,
};
