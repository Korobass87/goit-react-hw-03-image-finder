function FetchImg(name, page) {
    return fetch(`https://pixabay.com/api/?q=${name}&page=${page}&key=25440089-75c058e87851521159a5db732&image_type=photo&orientation=horizontal&per_page=12`).then(response => {
      if (response.ok) {
        return response.json();
      }
  
      return Promise.reject(new Error(`Нет картинки с именем ${name}`));
    });
  }
  
  
  const api = {
    FetchImg,
  }; 

  export default api;