import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../styles/main.css';
import Slide from 'react-reveal/Slide'

const PictureSlider = (props) => {
    const { images } = props
    let slider = useRef(null)

    const settings = {
        dots: false,
        arrows: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        vertical: false,
        verticalSwiping: false,
        lazyLoad: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
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
            <Slide right cascade>
                <Slider ref={c => slider = c} {...settings} className="shadow-lg my ">
                    {images ? images.map(image =>
                        <div className="myThumb "
                            style={{
                                cursor: "pointer"
                            }}>
                            <img src={`http://localhost:5000/avatars/${image ? image+".thumb.jpg ": null}`} width="200" height="200" alt="Nothing" className="img-thumbnail" />
                        </div>
                    ) : null}

                </Slider>
            </Slide>
        </div>
    );
}

export default PictureSlider;
