export class AppError extends Error {
  statusCode: number;
  errors?: unknown;

  constructor(statusCode: number, message: string, errors?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}

//last line
// Collects the stack trace at the point where new AppError(...) is called.
// Attaches it to this (so err.stack is available).
// Makes the trace “start from the caller”, not from inside new AppError(...) or from super(message).