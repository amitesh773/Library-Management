import type { Response } from "express";
import type { authRequest } from "../../middleware/authMiddleware.js";
import { ServerError } from "../../common/response.js";
import { studentValidation } from "../../validation/studentValidation.js";
import Student from "../../models/student.js";
import { Status } from "../../common/status.js";
import User from "../../models/user.js";
import { authPlugins } from "mysql2";



export const createStudent = async (req: authRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const userRole = req.user?.role;

    // Check login user
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // Validation
    const { error } = studentValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0]?.message
      });
    }

    const {
      className,
      rollNo,
      division,
      semester,
      course,
      department,
    } = req.body;

    const existingStuden = await Student.findOne({
      where: {
        userId
      }
    })

    if (existingStuden) {
      return res.status(409).json({
        message: "Studnet profile alredy created"
      })
    }

    // Check roll number
    const existingRollNo = await Student.findOne({
      where: {
        rollNo,
        className
      },
    });

    if (existingRollNo) {
      return res.status(409).json({
        message: "Roll number already exists",
      });
    }
    // Create student
    const student = await Student.create({
      userId,
      className,
      rollNo,
      division,
      semester,
      course,
      department,

    });

    return res.status(201).json({
      message: "Student created successfully",
      data: {
        userId: student.userId,
        className: student.className,
        rollNo: student.className,
        division: student.division,
        semester: student.semester,
        course: student.course,
        department: student.department,
        status: student.status,
      }
    });

  } catch (error) {
    return ServerError(res, error)
  }
}

export const allStudent = async (req: authRequest, res: Response) => {
  try {

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unautherized"
      })
    }


    const student = await Student.findAll({
      where: {
        status: "ACTIVE",
      },


      include: [
        {
          model: User,
          as: "user",
          attributes: [
            "id",
            "name",
            "surname",
            "email",
            "phone",
            "role",
            "status"
          ],
        },
      ],
      order: [["createdAt", "DESC"]]
    })

    if (!student) {
      return res.status(404).json({
        message: "Studen not found"
      })
    }

    return res.status(200).json({
      message: "Students fetched successfully",
      length: student.length,
      data: student,
    })
  } catch (error) {
    return ServerError(res, Error)
  }
}

export const singleStudent = async (req: authRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unautherized"
      })
    }

    const { id } = req.params;

    const studentId = Number(id);

    if (!id || !Number.isInteger(studentId) || studentId <= 0) {
      return res.status(409).json({
        message: "Invalid Id Number"
      })
    }

    const student = await Student.findOne({
      where: {
        userId,
        id: studentId,
        status: "ACTIVE"
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: [
            "id",
            "name",
            "surname",
            "email",
            "phone",
            "role",
            "status"
          ]
        }
      ]
    })

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      })
    }

    const studentData = student.toJSON();

    return res.status(201).json({
      message: "Student found Successfully",
      data: {
        studentData

      }
    })
  } catch (error) {
    return ServerError(res, error)
  }
}

export const updateStudent = async (req: authRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unautherized"
      })
    }

    const { id } = req.params;

    const studentId = Number(id);

    if (!id || !Number.isInteger(studentId) || studentId <= 0) {
      return res.status(409).json({
        message: "Invalid Id"
      })
    }

    const { error } = studentValidation.validate(req.body)
    if (error) {
      return res.status(400).json({
        message: error.details[0]?.message
      })
    }

    const student = await Student.findOne({
      where: {
        id: studentId,
        userId
      }
    })

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      })
    }

    const { className, rollNo, division, semester, course, department } = req.body;

    // New Value

    const newClassName = className ?? student.className;
    const newRollNo = rollNo ?? student.rollNo;

    console.log(newClassName)
    console.log(newRollNo)

    if (className !== undefined || rollNo !== undefined) {
      const existingStuden = await Student.findOne({
        where: {
          className: newClassName,
          rollNo: newRollNo
        },
      });
      if (
        existingStuden &&
        existingStuden.id! == studentId

      ) {
        return res.status(409).json({
          message: "Roll number already exists in this class",
        });
      }

    }

    await student.update({
      ...(className !== undefined && {className}),
      ...(rollNo !== undefined && {rollNo}),
      ...(division !== undefined && {division}),
      ...(semester !== undefined && {semester}),
      ...(course !== undefined && {course}),
      ...(department !== undefined && {department}),
      updatedBy: userId
    })

    return res.status(201).json({
      message: "Student updated successfully",
      data : {
        id: student.id,
        userId: student.userId,
        className: student.className,
        rollNo: student.rollNo,
        division: student.division,
        semester: student.semester,
        course: student.course,
        department: student.department,
        status: student.status
      }
    })
  } catch (error) {
    return ServerError(res, error)
  }
}

export const deleteStudent = async (req: authRequest, res: Response)=>{
  try {
    const userId = req.user?.id

    if(!userId){
      return res.status(401).json({
        message: "Unautherized"
      })
    }
    const {id} = req.params;
    const studentId = Number(id);

    if(!id || !Number.isInteger(studentId)|| studentId<=0){
      return res.status(409).json({
        message: "Invalid Id"
      })
    }

    const student = await Student.findOne({
      where: {
        id: studentId,
        userId,

      }
    })

    if(!student){
      return res.status(404).json({
        message: "Student not found"
      })
    }

    // Delete Student

    await Student.destroy({
      where: {
        userId,
        id: studentId
      }
    })


    return res.status(201).json({
      message: "Student deleted successfully",
      data: student
    })
  } catch (error) {
    return ServerError(res, error)
  }
} 
