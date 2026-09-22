import Joi from "joi";

export const studentValidation = Joi.object({
  userId: Joi.number()
    .integer()
    .positive()
    .messages({
      "number.base": "userId must be a number",
      "number.integer": "userId must be an integer",
      "number.positive": "userId must be a positive number",
      "any.required": "userId is required",
    }),

  className: Joi.string()
    .trim()
    .min(1)
    .max(100)
    .required()
    .messages({
      "string.empty": "className is required",
      "string.min": "className must not be empty",
      "string.max": "className must not exceed 100 characters",
      "any.required": "className is required",
    }),

  rollNo: Joi.string()
    .trim()
    .min(1)
    .max(50)
    .required()
    .messages({
      "string.empty": "rollNo is required",
      "string.max": "rollNo must not exceed 50 characters",
      "any.required": "rollNo is required",
    }),

  division: Joi.string()
    .trim()
    .min(1)
    .max(20)
    .required()
    .messages({
      "string.empty": "division is required",
      "string.max": "division must not exceed 20 characters",
      "any.required": "division is required",
    }),

  semester: Joi.number()
    .integer()
    .min(1)
    .max(20)
    .required()
    .messages({
      "number.base": "semester must be a number",
      "number.integer": "semester must be an integer",
      "number.min": "semester must be at least 1",
      "number.max": "semester cannot be greater than 20",
      "any.required": "semester is required",
    }),

  course: Joi.string()
    .trim()
    .min(1)
    .max(100)
    .required()
    .messages({
      "string.empty": "course is required",
      "string.max": "course must not exceed 100 characters",
      "any.required": "course is required",
    }),

  department: Joi.string()
    .trim()
    .min(1)
    .max(100)
    .required()
    .messages({
      "string.empty": "department is required",
      "string.max": "department must not exceed 100 characters",
      "any.required": "department is required",
    }),
});