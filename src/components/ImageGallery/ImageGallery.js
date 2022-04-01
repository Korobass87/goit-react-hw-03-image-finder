import React, { Component } from 'react'
import API from "../../Services/API"
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'
import Modal from 'components/Modal/Modal'
import Button from 'components/Button/Button'

import "./ImageGallery.scss"
import Loading from 'components/Loading/Loading'

const Status = {
  LOADING: "loading",
  REJECTED: "rejected",
  MODAL: "modal"
}

export default class ImageGallery extends Component {
  state = {
    hits: null,    
    modalImg: "",    
    error: null,
    page: 1,
    maxPage: 0,
    showLoadMore: false,
    status: "waiting"
  }


  showModal = (img) => {
    this.setState({modalImg: img, status: Status.MODAL})
  }
  closeModal = () => {
    this.setState({status: Status.REJECTED})
  }
  
  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imgName;
    const nextName = this.props.imgName;
    
    if  (prevName !== nextName) {
      await this.setState({status: Status.LOADING, page: 1, hits: null })

                API.FetchImg(nextName, this.state.page)
            .then(data=>{(data.total>0) ? this.setState({hits: data.hits, error: null}) : this.setState({error: true, hits: null}); if(data.total>12){this.setState({maxPage: Math.ceil(data.totalHits/12), showLoadMore: true})}})
            .catch(error=>this.setState({error}))
            .finally(()=>{this.setState({status: Status.REJECTED})})
          
    }



  }

 loadMore = async ()=>{
    
     await this.setState({status: Status.LOADING, page: this.state.page + 1, showLoadMore: false})
        this.scroll()
    
        API.FetchImg(this.props.imgName, this.state.page)
        .then(data => this.setState({hits: [...this.state.hits, ...data.hits]}))
        .finally(()=>{this.setState({status: Status.REJECTED, showLoadMore: true}); this.scroll()})
        
 }

 scroll() {
    window.scrollBy({
    top: 500,
    behavior: 'smooth',
    })  
    
}
  
  
  
  
  render() {

    const {error, hits, status, maxPage} = this.state
    return (
      
        <section>

        {error && <div className='wrap'><h2>Картинки с именем <span className='wrapper'>{this.props.imgName}</span> не найдено</h2></div>}

        {this.props.imgName === "" && <div className='wrap'><h2>Введите текст для поиска картинки</h2></div>}
  
        {hits && <><ul className="gallery">{this.state.hits.map(img => <ImageGalleryItem key={img.id} URL={img.webformatURL} largeImg={img.largeImageURL} alt={this.props.imgName} showModal={this.showModal} />)}
        
        </ul> </>}
        
        {status === "loading" && <Loading/>}

       {maxPage !== this.state.page && this.state.hits && this.state.showLoadMore && <Button loadMore={this.loadMore}/> }
       
        { status === "modal" && <Modal  URL={this.state.modalImg} closeModal={this.closeModal}  />}
       
        </section>
  )
  }
}
