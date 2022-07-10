import { ImageItems } from 'components/ImageItems/ImageItems';
import { List } from './ImageGallery.styled';

export function ImageGallery({ imagesInfo, toggleModal }) {
  return (
    <List>
      {imagesInfo.map(({ id, tags, webformatURL, largeImageURL }) => (
        <ImageItems
          key={id}
          alt={tags}
          previewImage={webformatURL}
          onClickImage={() => {
            toggleModal(largeImageURL);
          }}
        />
      ))}
    </List>
  );
}
