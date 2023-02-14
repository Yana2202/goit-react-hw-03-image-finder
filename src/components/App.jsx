import { Component } from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {searchImages} from './api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Spinner } from './Loader/Loader';
import { Button } from './Button/Button';
export class App extends Component {
  state = {
    images: [],
    query: '',
    isLoading: false,
    error: null,
    page: 1,
    status: 'idle',
  };

    componentDidUpdate(_, prevState) {
      const { query: currentQuery, page: currentPage } = this.state;
      const { query: prevQuery, page: prevPage } = prevState;
  
      if (prevQuery !== currentQuery || prevPage !== currentPage) {
        this.setState({ isLoading: true });
        searchImages(currentQuery, currentPage)
          .then(imagesFromApi => {
            console.log(imagesFromApi);
            this.setState(prevState => ({
              images: [...prevState.images, ...imagesFromApi.hits ],
            }));
          })
          .catch(error =>
            this.setState({ error: error.message})
          )
          .finally(() => this.setState({ isLoading: false }));
      }
    }

    handleFormSubmit = query => {
      this.setState({
        query,
        images: [],
        page: 1,
      });
    };
    
    handleLoadMore = () => {
      this.setState(prevState => ({ page: prevState.page + 1 }));
    };

    render(){
      
        return(
          <div>
             
        <Searchbar onSubmit={this.handleFormSubmit}/>
             {this.state.isLoading && <Spinner />}
             {this.state.images.length > 0 && (
          <>
            <ImageGallery images={this.state.images} />
            <Button onClick={this.handleLoadMore} />
          </>
        )}
             <ToastContainer />
      
             </div>
       
      
        );
    }
}
