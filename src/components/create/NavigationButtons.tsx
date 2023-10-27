import BackIcon from '@Assets/icons/BackIcon';
import CompleteBtn from '@Assets/icons/CompleteBtn';
import { ICON_PROPERTIES } from '@Constants/create';

interface Props {
  toHome: () => void;
  handleSubmit: () => void;
}

const NavigationButtons = ({ toHome, handleSubmit }: Props) => {
  return (
    <>
      <button onClick={toHome}>
        <BackIcon
          color={ICON_PROPERTIES.BACK_ICON.COLOR}
          width={ICON_PROPERTIES.BACK_ICON.WIDTH.toString()}
          height={ICON_PROPERTIES.BACK_ICON.HEIGHT.toString()}
        />
      </button>
      <button onClick={handleSubmit}>
        <CompleteBtn />
      </button>
    </>
  );
};

export default NavigationButtons;
