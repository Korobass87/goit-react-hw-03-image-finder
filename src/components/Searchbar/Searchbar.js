import React, { Component } from 'react'
import "./Searchbar.scss"
import { FiSearch } from "react-icons/fi";


export default class Searchbar extends Component {

state = {
  query: ""
}

handleSubmit = e => {
  e.preventDefault();

  if(this.state.query.trim() === "") {
    alert("Введите название для поиска картинок")
    return
  }
  this.props.onSubmit(this.state.query)
  this.setState({ query: "" })
  ;
}


handelInputChange  = e => {
  const {value} = e.currentTarget
  this.setState({ query: value });
  
};
  
  render() {
    
    return (
      <>
        <header className="searchbar">
          <form className="form" onSubmit={this.handleSubmit} >
            <button type="submit" className="button">
               <FiSearch/>
            </button>

            <input
              value={this.state.query}
              name='value'
              className="input"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={this.handelInputChange}
            />
          </form>
        </header>
      </>
    )
  }
}
