
/**
 * Used for testing error codes
 */
export class CustomError extends Error {
  constructor(statusCode, ...params) {
    super(...params);

    this.statusCode = statusCode;
  }
}
