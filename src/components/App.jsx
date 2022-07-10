import { Searchbar } from 'components/Searchbar/Searchbar';
import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { apiImage } from './services/api';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    searchValue: '',
    page: 1,
    value: [],
    status: 'idle',
    error: '',
    showModal: false,
    modalImage: null,
  };

  componentDidUpdate(_, prevState) {
    if (prevState.searchValue !== this.state.searchValue) {
      this.fetchGallery();
    }
  }

  onSubmit = event => {
    this.setState({
      searchValue: event,
      status: 'pedding',
    });
  };

  toggleModal = largeImageURL => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      modalImage: largeImageURL,
    }));
  };

  fetchGallery = () => {
    const { searchValue, page } = this.state;

    apiImage(searchValue, page)
      .then(response => {
        this.setState({
          value: response,
        });
        if (response.hits.length === 0) {
          this.setState({
            error: 'По вашему запросу не чего не найдено!',
          });
        }
      })
      .catch(error => {
        this.setState({
          error: error.message,
        });
      });
  };

  render() {
    const { value, showModal, modalImage } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery imagesInfo={value} toggleModal={this.toggleModal} />
        {showModal && (
          <Modal image={modalImage} closeModal={this.toggleModal} />
        )}
      </>
    );
  }
}
