import React from 'react';
import {Link} from 'react-router-dom';

const CtaSection = (props) => {
  return (
    <section id="cta">
      <div className='container'>
        <h2 className="card-title">Get Started Today</h2>
        <h5>Start capturing your ideas and inspiration in notes</h5>
        <Link to='/sign-up' className="btn btn-outline-light btn-lg download-button">
          SIGN UP FOR FREE
        </Link>
      </div>
    </section>
)
}

export default CtaSection;
