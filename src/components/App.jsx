import React, { Component } from 'react'
import Searchbar from './Searchbar/Searchbar'
import ImageGallery from './ImageGallery/ImageGallery'


export default class App extends Component {
 state = {
   nameQuery: "",
   
 }
 
 formSubmit = (nameQuery) => {
   
   this.setState ({nameQuery})
 } 

  render() {
    return (
      <div >
        <Searchbar onSubmit={this.formSubmit} />
        <ImageGallery imgName={this.state.nameQuery} />
       </div>
    )
  }
}




