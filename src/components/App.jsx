import { Searchbar } from 'components/Searchbar/Searchbar';
import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { apiImage } from './services/api';

export class App extends Component {
  state = {
    searchValue: '',
    page: 1,
    value: [],
    status: 'idle',
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

  fetchGallery = () => {
    const { searchValue, page } = this.state;

    apiImage(searchValue, page)
      .then(response => {
        this.setState({
          value: response,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { value } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery imagesInfo={value} />
      </>
    );
  }
}
