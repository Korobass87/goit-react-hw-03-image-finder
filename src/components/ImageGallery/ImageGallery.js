import React, { Component } from 'react'
import API from "../../Services/API"
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'
import Modal from 'components/Modal/Modal'
import { TailSpin } from  'react-loader-spinner'
import "./ImageGallery.scss"



export default class ImageGallery extends Component {
  state = {
    hits: null,
    showModal: false,
    modalImg: "",
    loading: false,
    error: null,
    page: 1,
    maxPage: 0,
    showLoadMore: false
  }


  showModal = (img) => {
    this.setState({modalImg: img, showModal: true})
  }
  closeModal = () => {
    this.setState({showModal: false})
  }
  
  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imgName;
    const nextName = this.props.imgName;
    
    if  (prevName !== nextName) {
      await this.setState({loading: true, page: 1, hits: null })

                API.FetchImg(nextName, this.state.page)
            .then(data=>{(data.total>0) ? this.setState({hits: data.hits, error: null}) : this.setState({error: true, hits: null}); if(data.total>12){this.setState({maxPage: Math.ceil(data.totalHits/12), showLoadMore: true})}})
            .catch(error=>this.setState({error}))
            .finally(()=>{this.setState({loading: false})})
          
    }



  }

 loadMore = async ()=>{
    
     await this.setState({loading: true, page: this.state.page + 1, showLoadMore: false})
        this.scroll()
    
        API.FetchImg(this.props.imgName, this.state.page)
        .then(data => this.setState({hits: [...this.state.hits, ...data.hits]}))
        .finally(()=>{this.setState({loading: false, showLoadMore: true}); this.scroll()})
        
 }

 scroll() {
    window.scrollBy({
    top: 500,
    behavior: 'smooth',
    })  
    
}
  
  
  
  
  render() {
    return (
        <body>

        {this.state.error && <div className='wrap'><h2>Картинки с именем <span className='wrapper'>{this.props.imgName}</span> не найдено</h2></div>}

        {this.props.imgName === "" && <div className='wrap'><h2>Введите текст для поиска картинки</h2></div>}
  
        {this.state.hits && <><ul className="gallery">{this.state.hits.map(img => <ImageGalleryItem key={img.id} URL={img.webformatURL} largeImg={img.largeImageURL} alt={this.props.imgName} showModal={this.showModal} />)}
        
        </ul> </>}
        
        {this.state.loading && <div className='wrap'><TailSpin color="blue"/></div>}

       { this.state.maxPage !== this.state.page && this.state.hits && this.state.showLoadMore && <div className='wrap'><button className='loadMoreBtn' type='button' onClick={this.loadMore} > load more... </button></div> }
       
        { this.state.showModal && <Modal URL={this.state.modalImg} closeModal={this.closeModal}  />}
       
        </body>
  )
  }
}
