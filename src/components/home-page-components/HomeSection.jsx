import React from 'react';
import {Link} from 'react-router-dom';

const HomeSection = (props) => {
  return (
    <section id="home">
      <div className="container">
        <div className="row">
          <div className="col-md-6 homeHeadingCol">
            <h1>
              A single place for your notes, ideas, lists
            </h1>
            <div>
              <Link to='/sign-up' className="btn btn-warning btn-lg mainBtn" style={{color: 'white', fontSize: '1.1rem'}}>
                SIGN UP FOR FREE
              </Link>
            </div>
          </div>
          <div className="col-md-6 homeImgCol">
            <img src={require('../../images/notes-illustrations.jpg')} alt="notes illustrations"/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeSection;
