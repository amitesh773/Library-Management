import type { Request, Response } from "express";
import { ServerError } from "../../common/response.js";
import { authValidation } from "../../validation/authValidation.js";
import User from "../../models/user.js";
import bcrypt from "bcrypt"
import { json, Op } from "sequelize";
import JWT from "jsonwebtoken"
import { credentials } from "../../config/credentials.js";
import type { authRequest } from "../../middleware/authMiddleware.js";
import { join } from "path";

export const singup = async (req: Request, res: Response) => {
  try {

    //validation check karo 
    const { error } = authValidation.validate(req.body);

    if (error) {
      return res.status(401).json({
        message: error.details[0]?.message
      })
    }

    const { name, email, phone, password } = req.body;

    const userData = await User.findOne({
      where: {
        [Op.or]: [
          { email },
          { phone }
        ]
      }
    })
    if (userData) {
      if (userData.email === email) {
        return res.status(400).json({
          message: "Email alredy existing"
        })
      }
      if (userData.phone === phone) {
        return res.status(400).json({
          mesage: "Phone is alresy existing"
        })
      }
    }
    // const existingEmail = await User.findOne({
    //   where: {
    //     email
    //   }
    // })

    // if(existingEmail){
    //   return res.status(401).json({
    //     message: "Email is alredy existing"
    //   })
    // }

    // const existingPhone = await User.findOne({
    //   where: {
    //     phone
    //   }
    // })

    // if(existingPhone){
    //   return res.status(401).json({
    //     message: "Phone is alredy existing"
    //   })
    // }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashPassword,
    })

    return res.status(201).json({
      success: true,
      message: "SingUp completed",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    })
  } catch (error) {
    return ServerError(res, error)
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(404).json({
        message: "email is required"
      })
    }

    const userData = await User.findOne({
      where: {
        email
      },
      attributes: [
        "id",
        "name",
        "email",
        "phone",
        "password",
        "role",
        "status",
      ], raw: true
    })

    if (!userData) {
      return res.status(401).json({
        message: "User not found"
      })
    }

    const isMatch = await bcrypt.compare(password, userData.password)

    if (!isMatch) {
      return res.status(404).json({
        message: 'Invalid Password'
      })
    }

    const token = JWT.sign({
      id: userData.id,
      email: userData.email,
      role: userData.role,
      status: userData.status
    }, credentials.JWT_SECRET)

    return res.status(201).json({
      success: true,
      message: "Login successfully",
      token
    })
  } catch (error) {
    return ServerError(res, error)
  }
}

export const profile = async (req: authRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "unautherized"
      })
    }

    const userData = await User.findByPk(userId,
      {
        attributes: [
          "id",
          "name",
          "email",
          "phone",
          "role",
          "status",
          "createdAt",
          "updatedAt",

        ], raw: true
      })

    if (!userData) {
      return res.status(404).json({
        message: "User not found"
      })
    }

    return res.status(201).json({
      success: true,
      message: "Profile Fatched successfully",
      data: userData
    })

  } catch (error) {
    return ServerError(res, error)
  }
}

export const logout = async (req: authRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        messahe: "unautherized"
      })
    }
    return res.status(201).json({
      success: true,
      message: "Logout successfully"
    })
  } catch (error) {
    return ServerError(res, error)
  }
}