export class ApiError extends Error {
  status?: number
  code?: string
  detail?: string
  raw?: unknown

  constructor(
    message: string,
    options?: {
      status?: number
      code?: string
      detail?: string
      raw?: unknown
    },
  ) {
    const { status, code, detail, raw } = options || {}
    super(message)
    this.status = status
    this.code = code
    this.detail = detail
    this.raw = raw

    if (typeof (Error as any).captureStackTrace === 'function') {
      ;(Error as any).captureStackTrace(this, this.constructor)
    }
  }
}
