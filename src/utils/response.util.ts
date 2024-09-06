import { Response } from 'express';
import { MESSAGES } from '../configs';
import { PaginationData } from '../interfaces';

enum ResponseStatus {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
  UNAVAILABLE = 503,
}

export function AuthFailureResponse(res: Response, message = MESSAGES.AUTH_FAILURE): Response {
  return res
    .status(ResponseStatus.UNAUTHORIZED)
    .send({ success: false, status: ResponseStatus.UNAUTHORIZED, message });
}

export function BadRequestResponseWithError(
  res: Response,
  errors: string[],
  message = MESSAGES.BAD_PARAMETERS,
): Response {
  return res
    .status(ResponseStatus.BAD_REQUEST)
    .send({ success: false, status: ResponseStatus.BAD_REQUEST, message, errors });
}

export function NotFoundResponse(res: Response, message = MESSAGES.NOT_FOUND): Response {
  return res
    .status(ResponseStatus.NOT_FOUND)
    .send({ success: false, status: ResponseStatus.NOT_FOUND, message });
}

export function ForbiddenResponse(res: Response, message = MESSAGES.FORBIDDEN): Response {
  return res
    .status(ResponseStatus.FORBIDDEN)
    .send({ success: false, status: ResponseStatus.FORBIDDEN, message });
}

export function BadRequestResponse(res: Response, message = MESSAGES.BAD_PARAMETERS): Response {
  return res
    .status(ResponseStatus.BAD_REQUEST)
    .send({ success: false, status: ResponseStatus.BAD_REQUEST, message });
}

export function ForbiddenButWeMoveResponse<T>(
  res: Response,
  data: T,
  message = MESSAGES.BAD_PARAMETERS,
): Response {
  return res
    .status(ResponseStatus.FORBIDDEN)
    .json({ success: true, status: ResponseStatus.FORBIDDEN, message, data });
}

export function InternalErrorResponse(res: Response, message = MESSAGES.INTERNAL_ERROR): Response {
  return res
    .status(ResponseStatus.INTERNAL_ERROR)
    .send({ success: false, status: ResponseStatus.INTERNAL_ERROR, message });
}

export function SuccessMsgResponse(res: Response, message = MESSAGES.FETCHED): Response {
  return res
    .status(ResponseStatus.SUCCESS)
    .send({ success: true, status: ResponseStatus.SUCCESS, message });
}

export function FailureMsgResponse(res: Response, message = MESSAGES.ERROR): Response {
  return res
    .status(ResponseStatus.SUCCESS)
    .send({ success: false, status: ResponseStatus.SUCCESS, message });
}

export function SuccessResponse<T>(
  res: Response,
  data: T,
  message = MESSAGES.SUCCESSFUL,
): Response {
  return res
    .status(ResponseStatus.SUCCESS)
    .json({ success: true, status: ResponseStatus.SUCCESS, message, data });
}

export function SuccessResponseWithPagination<T>(
  res: Response,
  data: T,
  pagination: PaginationData,
  message = MESSAGES.SUCCESSFUL,
): Response {
  return res
    .status(ResponseStatus.SUCCESS)
    .json({ success: true, status: ResponseStatus.SUCCESS, message, data, pagination });
}

export function AccessTokenErrorResponse(
  res: Response,
  message = MESSAGES.ACCESS_TOKEN_ERROR_RESPONSE,
): Response {
  return res
    .status(ResponseStatus.UNAUTHORIZED)
    .send({ success: false, status: ResponseStatus.UNAUTHORIZED, message });
}

export function TokenRefreshResponse(
  res: Response,
  message = MESSAGES.FETCHED,
  accessToken: string,
  refreshToken: string,
): Response {
  return res.status(ResponseStatus.SUCCESS).json({
    success: true,
    status: ResponseStatus.SUCCESS,
    message,
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
}

export function ComingSoonResponse(res: Response, message = MESSAGES.COMING_SOON): Response {
  return res
    .status(ResponseStatus.UNAVAILABLE)
    .send({ success: false, status: ResponseStatus.UNAVAILABLE, message });
}
