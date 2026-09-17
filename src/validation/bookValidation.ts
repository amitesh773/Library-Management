import Joi from "joi";
import { BookStatus } from "../common/status.js";

export const bookValidation = Joi.object({
    title: Joi.string()
        .trim()
        .min(2)
        .max(200)
        .required()
        .messages({
            "string.empty": "Book title is required",
            "string.min": "Book title must be at least 2 characters",
            "string.max": "Book title cannot exceed 200 characters",
            "any.required": "Book title is required",
        }),

    author: Joi.string()
        .trim()
        .min(2)
        .max(150)
        .required()
        .messages({
            "string.empty": "Author name is required",
            "string.min": "Author name must be at least 2 characters",
            "string.max": "Author name cannot exceed 150 characters",
            "any.required": "Author name is required",
        }),

    isbn: Joi.string()
        .trim()
        .min(10)
        .max(20)
        .required()
        .messages({
            "string.empty": "ISBN is required",
            "string.min": "ISBN must be at least 10 characters",
            "string.max": "ISBN cannot exceed 20 characters",
            "any.required": "ISBN is required",
        }),

    category: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required()
        .messages({
            "string.empty": "Category is required",
            "string.min": "Category must be at least 2 characters",
            "string.max": "Category cannot exceed 100 characters",
            "any.required": "Category is required",
        }),

    publisher: Joi.string()
        .trim()
        .max(150)
        .allow("", null)
        .optional()
        .messages({
            "string.max": "Publisher cannot exceed 150 characters",
        }),

    publishedYear: Joi.number()
        .integer()
        .min(1000)
        .max(new Date().getFullYear())
        .optional()
        .messages({
            "number.base": "Published year must be a number",
            "number.integer": "Published year must be an integer",
            "number.min": "Invalid published year",
            "number.max": "Published year cannot be greater than current year",
        }),

    totalCopies: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            "number.base": "Total copies must be a number",
            "number.integer": "Total copies must be an integer",
            "number.min": "Total copies must be at least 1",
            "any.required": "Total copies is required",
        }),

    availableCopies: Joi.number()
        .integer()
        .min(0)
        .max(Joi.ref("totalCopies"))
        .optional()
        .messages({
            "number.base": "Available copies must be a number",
            "number.integer": "Available copies must be an integer",
            "number.min": "Available copies cannot be negative",
            "number.max": "Available copies cannot be greater than total copies",
        }),

    status: Joi.string()
        .valid(...Object.values(BookStatus))
        .optional()
        .messages({
            "any.only": "Invalid book status",
        }),
});

