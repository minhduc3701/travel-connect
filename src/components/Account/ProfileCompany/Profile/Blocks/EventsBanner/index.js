import React from 'react';
import 'instantsearch.css/themes/algolia.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RoadMapItem from "./RoadMapItem";

const mediaList = [
    {
        id: 1,
        postion: 0,
        image: 'https://image.freepik.com/free-photo/vacation-concept-with-plane-bus_23-2148169835.jpg',
        image2: '',
        title: 'B2B Travel Connect',
        desc: 'Powering solutions for the global travel industry'
    },
    {
        id: 2,
        postion: 0,
        image: 'https://image.freepik.com/free-photo/composition-toy-airplane-bus-compass-globe_23-2148169872.jpg',
        image2: '',
        title: 'Optimize your hotel revenue streams',
        desc: 'Uncover the definitive guide to managing your travel agency’s hotel content'
    },
    {
        id: 3,
        postion: 0,
        image: 'https://image.freepik.com/free-photo/travel-concept-with-globe_23-2148169842.jpg',
        image2: '',
        title: '6 traveler personas your OTA should target',
        desc: 'Read our OTA guide to enhance your targeting'
    },
    {
        id: 4,
        postion: 0,
        image: 'https://image.freepik.com/free-photo/travel-beach-concept_23-2148169826.jpg',
        image2: '',
        title: 'Unlock the potential of your GDS',
        desc: 'How to increase revenue by unlocking the potential of your GDS'
    }
];

class EventsBanner extends React.Component {
    state = {
        searchText: '',
    };

    updateSearchChatUser = (evt) => {
        this.setState({
            searchText: evt.target.value,
        });
    };

    render() {
        const settings = {
            arrows: false,
            dots: false,
            infinite: true,
            speed: 1000,
            marginLeft: 0,
            marginRight: 0,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
        };
        return (
            <div className="pos-rel m-b-5" id="nav_event">
                <Slider className="gx-slick-slider p-b-0-i" {...settings}>
                    {
                        mediaList.map((media, index) =>
                            <RoadMapItem key={index} data={media} />
                        )
                    }
                </Slider>
            </div>
        );
    }
}

export default EventsBanner;
