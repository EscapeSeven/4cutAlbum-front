import DeleteIcon from '@Assets/icons/DeleteIcon';
import styled from 'styled-components';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetValue: () => void;
  placeholder?: string;
  label?: string;
  $hasError?: boolean;
  onFocus?: () => void;
}

const checkIsNull = (text: string) => text.trim() !== '';

const Input = ({ value, onChange, resetValue, placeholder, label, $hasError, onFocus }: InputProps) => {
  return (
    <div>
      {label && <S.Label>{label}</S.Label>}
      <S.InputContainer>
        <S.Input value={value} onChange={onChange} onFocus={onFocus} placeholder={placeholder} $hasError={$hasError} />
        {checkIsNull(value) && !$hasError && (
          <S.DeleteButton onClick={resetValue}>
            <DeleteIcon color="#666666" width="20" height="20" />
          </S.DeleteButton>
        )}
      </S.InputContainer>
    </div>
  );
};

export default Input;

const S = {
  Container: styled.div``,

  Label: styled.label`
    display: block;
    font-size: 2.5625rem;
    font-weight: 600;
    margin-bottom: 1.02rem;
    font-size: 20px;
    @media screen and (max-width: 768px) {
      font-size: 20px;
    }
  `,
  InputContainer: styled.div`
    position: relative;
  `,
  Input: styled.input<{ $hasError?: boolean }>`
    width: 100%;
    border: none;
    /* height: 96px;
     */
    height: 48px;
    background-color: #f7f7f7;
    padding-left: 1.54rem;

    color: ${(props) => (props.$hasError ? 'red' : 'black')};
    border-bottom: ${(props) => (props.$hasError ? '2px solid red' : 'none')};

    /* @media screen and (max-width: 768px) {
      height: 48px;
    } */
  `,
  DeleteButton: styled.button`
    cursor: pointer;
    position: absolute;

    right: 1.25rem;
    top: calc(50% - 20px);

    @media screen and (max-width: 768px) {
      right: 1.25rem;
      transform: translateY(5%);
    }
  `,
};
