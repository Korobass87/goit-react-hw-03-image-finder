import React, { Component } from 'react'
import "./Button.scss"

export default class Button extends Component {
  render() {
    return (
        <div className='wrap'><button className='loadMoreBtn' type='button' onClick={this.props.loadMore} > load more... </button></div>
    )
  }
}
