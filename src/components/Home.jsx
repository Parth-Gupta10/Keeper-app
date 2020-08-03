import React from 'react';
import HomeSection from './home-page-components/HomeSection';
import FeatureSection from './home-page-components/FeatureSection';
import FormatSection from './home-page-components/FormatSection';
import CtaSection from './home-page-components/CtaSection';
import Footer from './home-page-components/Footer';

const Home = (props) => {
  return (
    <React.Fragment>
      <HomeSection />
      <FeatureSection />
      <FormatSection />
      <CtaSection />
      <Footer />
    </React.Fragment>
)
}

export default Home;
