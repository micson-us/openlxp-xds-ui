import React from 'react';
import classes from './Header.module.css';
// import grid from '../../resources/vendors/css/Grid.css'
import { NavLink } from 'react-router-dom';
import logo from './dodLogo.png';
import searchButton from './search.svg';


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        alert('Text was submitted: ' + this.state.value);
        event.preventDefault();
      }

    render() {
        return (
            <div className={classes.div} >
                <img className={classes.logo} src={logo} alt="logo" />
                <div className={classes.div1}>
                    <p> <b className={classes.title}>Digital Learning Portal</b> </p>
                    <p> <b className={classes.title1}>U.S. Department of Defense</b> </p>
                </div>
                <div>
                <form onSubmit={this.handleSubmit} className={classes.search}>
                    <input className={classes.text} type="text" placeholder= "Keyword search" value={this.state.value} onChange={this.handleChange} />
                    <input className={classes.searchImage} type="image" name="Submit" src={searchButton} alt="Submit" />
                </form>
                
                <NavLink to='/signIn' className={classes.signIn}>Sign in</NavLink>
                </div>         
            </div>
        );
    }
    
}

export default Header;
