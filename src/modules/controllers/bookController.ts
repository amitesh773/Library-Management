import type { Response } from "express";
import type { authRequest } from "../../middleware/authMiddleware.js";
import { ServerError } from "../../common/response.js";
import { BookStatus, UserRole } from "../../common/status.js";
import { bookValidation } from "../../validation/bookValidation.js";
import { updateBookValidation } from "../../validation/updateBookValidation.js";
import Book from "../../models/book.js";
import { Op } from "sequelize";



export const createBook = async (req: authRequest, res: Response) => {
  try {

    const userId = req.user?.id;
    const userRole = req.user?.role;

    if (!userId) {
      return res.status(401).json({
        message: "unautherized"
      })
    }

    if (
      userRole !== UserRole.ADMIN &&
      userRole !== UserRole.MANAGER
    ) {
      return res.status(403).json({
        message: "You do not have a permission too create a book"
      })
    }

    const { error } = bookValidation.validate(req.body)
    if (error) {
      return res.status(400).json({
        message: error.details[0]?.message
      })
    }

    const { title, author, isbn, category, publisher, publishedYear, totalCopies, availableCopies, status, } = req.body;

    const existingBook = await Book.findOne({
      where: {
        isbn
      }
    })

    if (existingBook) {
      return res.status(409).json({
        message: "Book with this ISBN already exists"
      })
    }

    const book = await Book.create({
      title,
      author,
      isbn,
      category,
      publisher,
      publishedYear,
      totalCopies,
      availableCopies: availableCopies ?? totalCopies,
      status,
      createdBy: userId,
      updatedBy: userId
    })

    return res.status(201).json({
      message: "Book created successfully",
      data: book
    })
  } catch (error) {
    return ServerError(res, error)
  }
}

export const allBook = async (req: authRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        message: "unautherized"
      })
    }

    const books = await Book.findAll({
      order: [
        ["createdAt", "DESC"]
      ]
    })


    return res.status(201).json({
      message: "Books fetched successfully",
      count: books.length,
      data: books,
    })
  } catch (error) {
    return ServerError(res, error)
  }
}

export const singleBook = async (req: authRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        message: "unautherized"
      })
    }

    const { id } = req.params;

    const bookId = Number(id);

    if (!id || !Number.isInteger(bookId) || bookId <= 0) {
      return res.status(400).json({
        message: " Invalid Book Id and Id must be psitive number"
      })
    }

    // const book = await Book.findOne({
    //   where: {
    //     id: bookId
    //   }
    // })

    const book = await Book.findByPk(bookId)


    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      })
    }

    return res.status(201).json({
      message: "Book fetched successfully",
      data: book,
    })
  } catch (error) {
    return ServerError(res, error)
  }
}

export const updateBook = async (req: authRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const userRole = req.user?.role;

    if (!userId) {
      return res.status(401).json({
        message: "Unautherized"
      })
    }

    // id validation
    const { id } = req.params;

    const bookId = Number(id);

    if (!id || !Number.isInteger(bookId) || bookId <= 0) {
      return res.status(400).json({
        message: "Invalid Book Id |  Id must be a positive number"
      })
    }
    // role bas access 
    if (
      userRole !== UserRole.ADMIN &&
      userRole !== UserRole.MANAGER
    ) {
      return res.status(403).json({
        message: "You can not update this book "
      })
    }

    //find Book

    const book = await Book.findByPk(bookId)
    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      })
    }

    //validate req.body

    const { error } = updateBookValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0]?.message
      })
    }


    const { title, author, isbn, category, publisher, publishedYear, totalCopies, availableCopies, status } = req.body;

    const existingIsbn = await Book.findOne({
      where: {
        isbn,
        id: {
          [Op.ne] : bookId
        }
      }
    })
    if (existingIsbn) {
      return res.status(409).json({
        message: "This isbn alredy existing "
      })
    }

    await book.update({
      title,
      author,
      isbn,
      category,
      publisher,
      publishedYear,
      totalCopies,
      availableCopies,
      status,
      updatedBy: userId
    })

    return res.status(201).json({
      message: "Book updated successfully",
      data: book,
    })
  } catch (error) {
    return ServerError(res, error)
  }
}

export const deleteBook = async(req: authRequest, res: Response)=>{
  try {
    const userId = req.user?.id;
    if(!userId){
      return res.status(401).json({
        message: "unautherized"
      })
    }

    const userRole = req.user?.role;
    if(
      userRole !== UserRole.ADMIN &&
      userRole !== UserRole.MANAGER
    ){
      return res.status(403).json({
        message: "You do not have permission to delete this book"
      })
    }

    const {id}= req.params;

    const bookId = Number(id);

    if(!id || !Number.isInteger(bookId)|| bookId<=0){
      return res.status(400).json({
        message: "Invalid Book Id"
      })
    }

    const book = await Book.findByPk(bookId);

    if(!book){
      return res.status(404).json({
        message: "Book not found"
      })
    }

    if(book.status === BookStatus.ISSUED){
      return res.status(409).json({
        message: "Issued book can not be deleted"
      })
    }

    await book.destroy()

    return res.status(200).json({
      message: "Book deleted successfully",
      data: book
    })

  } catch (error) {
    return ServerError(res , error)
  }
}