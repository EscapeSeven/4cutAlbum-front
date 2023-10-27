import { ValidateInput } from '@Types/create';

export const isEmptyOrError = (input: string, errorMessage: string): boolean => {
  return input.trim() === '' || input === errorMessage;
};

export const validateInput: ValidateInput = (input, errorSetter, errorMessage) => {
  const isError = isEmptyOrError(input, errorMessage);
  errorSetter(isError);
  return !isError;
};
