import React, { Component } from 'react'
import "./ImageGalleryItem.scss"

export default class ImageGalleryItem extends Component {
    

showModal = (e) => {
    this.props.showModal(this.props.largeImg)
}




  render() {
    return (
        <li className="gallery-item">
                <img src={this.props.URL} alt={this.props.alt} onClick={this.showModal} />
        </li>
    )
  }
}
