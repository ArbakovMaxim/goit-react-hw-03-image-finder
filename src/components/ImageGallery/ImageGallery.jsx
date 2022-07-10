import { ImageItems } from 'components/ImageItems/ImageItems';
import { List } from './ImageGallery.styled';

export function ImageGallery({ imagesInfo }) {
  return (
    <List>
      {imagesInfo.map(({ id, tags, webformatURL }) => (
        <ImageItems key={id} alt={tags} previewImage={webformatURL} />
      ))}
    </List>
  );
}
