import { Spiner } from 'components/Spiner/Spiner';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalImage } from './Modal.styled';

const rootModal = document.querySelector('#root-modal');

export default class Modal extends Component {
  state = { status: 'idle' };

  componentDidMount() {
    window.addEventListener('keydown', this.handleEscape);
    this.openSniper();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscape);
  }

  handleEscape = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleBackdrop = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };
  closeSniper = () => {
    this.setState({
      status: 'idle',
    });
  };

  openSniper = () => {
    this.setState({
      status: 'pedding',
    });
  };

  render() {
    const { image } = this.props;
    return createPortal(
      <Overlay onClick={this.handleBackdrop}>
        {this.state.status === 'pedding' && <Spiner />}
        <ModalImage
          onLoad={this.closeSniper}
          src={image}
          alt="велике зображення"
        />
      </Overlay>,
      rootModal
    );
  }
}
