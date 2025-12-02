import { ApiError } from './ApiError'

export class TimeoutError extends ApiError {
  constructor(raw?: unknown) {
    super('The request timed out', { code: 'ECONNABORTED', raw })
  }
}
