import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error';
import { IGenericErrorResponse } from '../interfaces/common';

const handleValidationError = (
  error: mongoose.Error.ValidatorError
): IGenericErrorResponse => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
    (el): IGenericErrorMessage => {
      return {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        path: el?.path,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        message: el?.message,
      };
    }
  );
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation error',
    errorMessages: errors,
  };
};

export default handleValidationError;
