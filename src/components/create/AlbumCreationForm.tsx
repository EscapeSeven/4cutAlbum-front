import Input from '@Components/common/Input';

interface Props {
  title: string;
  subTitle: string;
  isTitleEmpty: boolean;
  isSubTitleEmpty: boolean;
  updateTitle: (value: string) => void;
  updateSubTitle: (value: string) => void;
  handleFocus: (type: 'title' | 'subTitle') => void;
}

const AlbumCreationForm = ({
  title,
  subTitle,
  isTitleEmpty,
  isSubTitleEmpty,
  updateTitle,
  updateSubTitle,
  handleFocus,
}: Props) => {
  return (
    <>
      <Input
        value={title}
        onChange={(e) => updateTitle(e.target.value)}
        resetValue={() => updateTitle('')}
        placeholder="앨범명"
        label="앨범명"
        $hasError={isTitleEmpty}
        onFocus={() => handleFocus('title')}
      />
      <Input
        value={subTitle}
        onChange={(e) => updateSubTitle(e.target.value)}
        resetValue={() => updateSubTitle('')}
        placeholder="부제목"
        label="부제목"
        $hasError={isSubTitleEmpty}
        onFocus={() => handleFocus('subTitle')}
      />
    </>
  );
};

export default AlbumCreationForm;
