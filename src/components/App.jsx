import { Searchbar } from 'components/Searchbar/Searchbar';
import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { apiImage } from './services/api';
import Modal from './Modal/Modal';
import { Spiner } from './Spiner/Spiner';

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
    if (
      prevState.searchValue !== this.state.searchValue ||
      prevState.page !== this.state.page
    ) {
      this.setState({
        status: 'pending',
      });
      if (this.state.page === 1) {
        this.setState({ value: [] });
      }
      this.fetchGallery();
    }
  }

  onSubmit = event => {
    if (event.trim() !== '') {
      this.setState({
        searchValue: event,
        page: 1,
        status: 'pending',
      });
    }
    this.setState({
      error: 'В ведите запрос',
      value: [],
      status: 'rejected',
    });
  };

  toggleModal = largeImageURL => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      modalImage: largeImageURL,
    }));
  };

  spiner = () => {
    this.setState({
      status: 'rejected',
    });
  };

  fetchGallery = () => {
    const { searchValue, page } = this.state;

    apiImage(searchValue, page)
      .then(response => {
        this.setState(prevState => ({
          value: [...prevState.value, ...response],
          status: 'rejected',
          error: '',
        }));
        if (response.length === 0) {
          this.setState({
            error: 'По вашему запросу не чего не найдено!',
          });
        }
      })
      .catch(error => {
        this.setState({
          error: error.message,
          status: 'rejected',
        });
      });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { value, showModal, modalImage, status, error } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        {status === 'pending' && <Spiner />}
        {error !== '' && <p> {error}</p>}
        {value.length !== 0 && (
          <ImageGallery
            loadMore={this.loadMore}
            imagesInfo={value}
            toggleModal={this.toggleModal}
          />
        )}
        {showModal && (
          <Modal image={modalImage} closeModal={this.toggleModal} />
        )}
      </>
    );
  }
}
