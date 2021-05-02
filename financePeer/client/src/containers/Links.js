import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

class Links extends Component {

    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    SignOutUser = async(e) => {
      e.preventDefault();
      if (typeof Storage !== "undefined") {
        if (localStorage.getItem("JWT") !== null) {
          localStorage.removeItem("JWT");
        }

        while( localStorage.getItem("JWT") !== null ){
          await this.sleep(100);
        }

        window.location.reload();
      }
    };

    render() {
        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand mx-auto">
                    FINANCE PEER
                </Link>
                <Link to="/database" className="navbar-brand mx-auto">
                    Show Database
                </Link>
                <button onClick={this.SignOutUser} className="btn-secondary navbar-brand mx-auto">
                    Sign Out
                </button>
            </React.Fragment>
        )
    }
}

export default Links
