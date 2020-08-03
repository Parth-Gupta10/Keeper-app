import React from 'react';

const Footer = (props) => {
  return (
    <footer id="footer">
      <a href="mailto:parth1716@gmail.com" target="_blank" rel="noopener noreferrer">
        <i className="social fas fa-envelope size:2x"></i>
      </a>
      <a href="https://linkedin.com/in/parth-gupta-6754871a4" target="_blank" rel="noopener noreferrer">
        <i className="social fab fa-linkedin-in size:2x"></i>
      </a>
      <a href="https://github.com/Parth-Gupta10" target="_blank" rel="noopener noreferrer">
        <i className="social fab fa-github size:2x"></i>
      </a>
      <p className="footer" style={{margin: "0"}}>
        &copy; Copyright
        <script type="text/javascript">
          document.write(new Date().getFullYear());
        </script>
        <span style={{marginLeft: '5px'}}>Parth Gupta</span>
      </p>
  </footer>
)
}

export default Footer;
