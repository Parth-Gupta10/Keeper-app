import React from 'react';

const style = {
  width: '80%',
  height: '300px',
  borderRadius: '21px 21px 0 0',
}

const imgStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '20px 20px 0 0',
}

const FeatureSection = (props) => {
  return (
    <section id='features'>
      <h1>
        <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
          <div className="mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden yellowBackground">
            <div className="my-3 py-3">
              <h2 className="display-5">Anywhere, Anytime</h2>
              <p className="lead">Find everything instantly on any device you have, no matter where you are.</p>
            </div>
            <div className="shadow-sm mx-auto bg-light" style={style}>
              <img src={require("../../images/access-anywhere-illustration.jpg")} alt="Access Anywhere illustration" style={imgStyle}/>
            </div>
          </div>
          <div className="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
            <div className="my-3 p-3">
              <h2 className="display-5">Rich Text</h2>
              <p className="lead">
                Get creative, Add colors, list, links and even headings to your notes
                (<a href="#format" style={{fontSize: '0.8rem'}}>See More</a>).
              </p>
            </div>
            <div className="shadow-sm mx-auto yellowBackground" style={style}>
              <img src={require("../../images/format-illustration.png")} alt="Format Content Text illustration" style={imgStyle} />
            </div>
          </div>
        </div>
      </h1>

      <h1>
        <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
          <div className="mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden bg-light">
            <div className="my-3 py-3">
              <h2 className="display-5">100 % Secure</h2>
              <p className="lead">Safe and reliable, keeps your information protected.</p>
            </div>
            <div className="shadow-sm mx-auto yellowBackground" style={style}>
              <img src={require("../../images/pass-protection-illustration.jpg")} alt="Password Protection illustration" style={imgStyle} />
            </div>
          </div>
          <div className="mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden yellowBackground">
            <div className="my-3 p-3">
              <h2 className="display-5">Set your Priorities</h2>
              <p className="lead">Mark your notes as important</p>
            </div>
            <div className="shadow-sm mx-auto bg-light" style={style}>
              <img src={require("../../images/important-illustration.jpg")} alt="Important illustration" style={imgStyle} />
            </div>
          </div>
        </div>
      </h1>
    </section>
)
}

export default FeatureSection;
