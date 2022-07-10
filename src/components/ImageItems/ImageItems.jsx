import { ListElement, ListImg } from './ImageItems.stylrd';

export function ImageItems({ alt, previewImage }) {
  return (
    <ListElement>
      <ListImg src={previewImage} alt={alt} />
    </ListElement>
  );
}
