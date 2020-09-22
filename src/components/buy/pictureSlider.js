import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/main.css';
import Slide from 'react-reveal/Slide'

const PictureSlider = (props) => {
    const { images, handleBgImage } = props
    let slider = useRef(null)

    const settings = {
        dots: false,
        arrows: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        vertical: true,
        verticalSwiping: true,
        lazyLoad: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    }

    return (
        <div className="p-s-show">
            <button className=" up fa fa-arrow-circle-o-up" onClick={() => slider.slickPrev()}></button>
            <Slide right cascade>
                <Slider ref={c => slider = c} {...settings} className="shadow-lg my ">
                    {images ? images.map(image =>
                        <div className="myThumb "
                            onClick={() => handleBgImage(image)}
                            style={{
                                cursor: "pointer"
                            }}>
                            <img src={`http://localhost:5000/avatars/${image ? image : null}`} alt="Nothing" className="img-thumbnail" />
                        </div>
                    ) : null}

                </Slider>
                <button className="down fa fa-arrow-circle-o-down" onClick={() => slider.slickNext()}></button>
            </Slide>
        </div>
    );
}

export default PictureSlider;
