import { ImageItems } from 'components/ImageItems/ImageItems';
import { BtnLoadMore, BtnWrapper, List } from './ImageGallery.styled';

export function ImageGallery({ imagesInfo, toggleModal, loadMore }) {
  return (
    <>
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
      <BtnWrapper>
        <BtnLoadMore onClick={loadMore}>load more</BtnLoadMore>
      </BtnWrapper>
    </>
  );
}
