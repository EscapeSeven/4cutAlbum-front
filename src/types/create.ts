export interface CoverDivProps {
  $isSelected?: boolean;
}

export type ErrorSetter = (val: boolean) => void;

export type ValidateInput = (input: string, errorSetter: ErrorSetter, errorMessage: string) => boolean;

export type FocusType = 'title' | 'subTitle';
