export class HttpError extends Error {
  status: number
  url: string
  body?: unknown

  constructor(message: string, status: number, url: string, body?: unknown) {
    super(message)
    this.name = "HttpError"
    this.status = status
    this.url = url
    this.body = body
  }
}

export class TimeoutError extends Error {
  constructor(message = "Request timed out") {
    super(message)
    this.name = "TimeoutError"
  }
}

export class ParseError extends Error {
  constructor(message = "Invalid JSON response") {
    super(message)
    this.name = "ParseError"
  }
}