import { Component } from "react";
import PropTypes from 'prop-types';
import  {toast}  from 'react-toastify';
import styles from './Searchbar.module.css'
import { BiSearchAlt } from 'react-icons/bi';
import {IconContext} from 'react-icons'
export class Searchbar extends Component {
    state = {
      image: '',
    };


handleNameChange = event => {
this.setState({image: event.currentTarget.value.toLowerCase()});
};

handleSubmit = event => {
    event.preventDefault();

    if (this.state.image.trim() === ''){
      toast.warn('Enter the name of the picture');
        return;
    }
    this.props.onSubmit(this.state.image);
    this.setState({image: ''});
};

render() {
    return(
    <div className={styles.searchbar}>
        <form 
        className={styles.form}
        onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.SearchFormButton}>
            <IconContext.Provider
              value={{
                color: 'blue',
                size: '3em',
                className: 'global-class-name',
              }}
            >
              <div>
                <BiSearchAlt />
              </div>
            </IconContext.Provider>
            </button>
             <input
             className={styles.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.image}
            onChange={this.handleNameChange}
          />
            </form>
            
          </div>
    );
}
}
Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  
  export default Searchbar;