'use strict';

class BaseController {
  constructor() {
  }

  conflict(message) {
    let errorMessage = message || 'Conflict';
    return this.errorReponse(409, errorMessage);
  }

  forbidden(message) {
    let errorMessage = message || 'Forbidden';
    return this.errorReponse(403, errorMessage);
  }

  notFound(message) {
    let errorMessage = message || 'Resource not found';
    return this.errorReponse(404, errorMessage);
  }

  unauthorized(message) {
    let errorMessage = message || 'Missing token or invalid token';
    return this.errorReponse(401, errorMessage);
  }

  unprocessableEntity(message) {
    let errorMessage = message || 'Invalid credentials or missing parameters';
    return this.errorReponse(422, errorMessage);
  }

  errorReponse(status, message, debugMessage) {
    let err = new Error();
    err.status = status || 400;
    err.message = message || 'bad_request';
    err.debugMessage = debugMessage || '';
    return err;
  }

  middlewareResponse(status, message, data={}, debugMessage='') {
    let statusRet = status || 201;
    let messageRet = message || '';

    return {
      "status": statusRet,
      "debugMessage": debugMessage,
      "message": messageRet,
      "data": data
    };
  }

  handleError(error) {
    if (!error) {
      return this.errorReponse(400, 'undefined_error', '');
    }

    let debugMessage = error.debugMessage || '';
    let message = error.message || 'undefined_error';
    if (error.response && error.response.data) {
      message = JSON.stringify(error.response.data);
    }
    let status = error.status || 400;
    if (error.response && error.response.status) {
      status = error.response.status;
    }
    return this.errorReponse(status, message, debugMessage);
  }

  errorResponse(err) {
    return this.handleError(err);
  }
}

module.exports = BaseController;
