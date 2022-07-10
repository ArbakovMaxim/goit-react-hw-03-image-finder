import axios from 'axios';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Component } from 'react';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const params = {
  key: `27247276-2a88fcc64ac0c5c7b7477cb08`,
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  perPage: 12,
  page: 1,
};

export class App extends Component {
  state = {
    searchValue: '',
    value: '',
    status: 'idle',
  };

  componentDidMount() {
    if (this.state.value !== '') {
      this.fff();
    }
  }

  fff = async params => {
    try {
      const response = await axios.get({ params });
      console.log(response);
      if (response.data.hits.length === 0) {
        return;
      } else {
        this.setState({
          value: response,
        });
        return response;
      }
    } catch (error) {
      alert('нехера');
    }
  };

  onSubmit = event => {
    this.setState({
      searchValue: event,
    });
    params.q = this.state.searchValue;
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
      </>
    );
  }
}
