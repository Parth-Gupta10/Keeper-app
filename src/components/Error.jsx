import React from 'react';
import {Link} from 'react-router-dom';

const style = {
  display : 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  textAlign: 'center',
  padding: '12% 14%'
}

const Error = (props) => {
  return (
    <div className="errorDiv" style={style}>
      <h1>CONGRATULATIONS ! You have found a page that does not exist</h1>
      <h4>
        <Link to='/'>
          Go Back to Home
        </Link>
      </h4>
    </div>
  )
}

export default Error
