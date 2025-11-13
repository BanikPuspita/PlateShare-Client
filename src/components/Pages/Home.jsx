import React from 'react';
import HeroBanner from '../HomeSections/HeroBanner';
import FeaturedFoods from '../HomeSections/FeaturedFoods';
import HowItWorks from '../HomeSections/HowItWorks';
import OurMission from '../HomeSections/OurMission';

const Home = () => {
    return (
        <div>
            <HeroBanner></HeroBanner>
            <FeaturedFoods></FeaturedFoods>
            <HowItWorks></HowItWorks>
            <OurMission></OurMission>
        </div>
    );
};

export default Home;