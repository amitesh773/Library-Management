import Joi from "joi";
import { BookStatus } from "../common/status.js";

export const updateBookValidation = Joi.object({
  title: Joi.string()
    .trim()
    .min(2)
    .max(200)
    .optional(),

  author: Joi.string()
    .trim()
    .min(2)
    .max(150)
    .optional(),

  isbn: Joi.string()
    .trim()
    .min(10)
    .max(20)
    .optional(),

  category: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .optional(),

  publisher: Joi.string()
    .trim()
    .max(150)
    .allow("", null)
    .optional(),

  publishedYear: Joi.number()
    .integer()
    .min(1000)
    .max(new Date().getFullYear())
    .optional(),

  totalCopies: Joi.number()
    .integer()
    .min(1)
    .optional(),

  availableCopies: Joi.number()
    .integer()
    .min(0)
    .optional(),

  status: Joi.string()
    .valid(...Object.values(BookStatus))
    .optional(),
});
