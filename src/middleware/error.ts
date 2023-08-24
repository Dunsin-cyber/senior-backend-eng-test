// import { STATUS_CODE } from 'constants/index'
import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'

export class AppError extends Error {
  statusCode!: number
  isOperational: boolean

  constructor(message: string, err: any) {
    console.log(message)
    super(message)
    this.statusCode = err
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }
}
