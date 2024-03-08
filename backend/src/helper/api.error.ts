export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly code?: number;

  constructor(message: string, statusCode: number, code?: number) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(message, 401);
  }
}
export class MongoError extends ApiError {
  constructor(message: string) {
    super(message, 400);
  }
}
