import React, { Component } from 'react'
import './Modal.scss'
export default class Modal extends Component {


    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
      }
    
      componentWillUnmount() {
       window.removeEventListener('keydown', this.handleKeyDown);
      }

      handleKeyDown = e => {
        if (e.code === 'Escape') {
         this.props.closeModal()    
        }
      };

      backdropClick = e => {
          if (e.currentTarget === e.target) {
            this.props.closeModal()
          }
      }


  render() {
    
    return (
        <div className="overlay" onClick={this.backdropClick}>
        <div className="modal">
          <img src={this.props.URL} alt="" />
        </div>
      </div>
    )
  }
}
