import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import { Link } from 'react-router-dom';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const Trending = ({blogs}) => {
    const options = {
        // loop: true,
        // margin: 10,
        // items: 3,
        // center: true,
        // nav: false,
        // dots:true,
        // autoplay:true,
        // autoplayTimeout: 8500,
        // smartSpeed: 450,
        loop: true,
        center: true,
        items: 3,
        margin: 0,
        autoplay: true,
        dots: true,
        autoplayTimeout: 4500,
        smartSpeed: 250,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            400: {
                items: 2
            },
            600: {
                items: 3
            },
            1000: {
                items: 4
            }
        }
    };
  return (
    <>
      <div>
        <div className="blog-heading text-start py-2 mb-4">
            <p className='blog-heading-title'><i class="fa-solid fa-chart-simple"></i>&nbsp; Tendance</p>
        </div>
      </div>
      <OwlCarousel id="customer-testimonoals" className='owl-carousel owl-theme' {...options}>
        {blogs?.map((item) => (
            <div className="item px-2" key={item.id}>
                <Link to={`/details/${item.id}`}>
                    <div className="trending-img-position">
                        <div className="trending-img-size">
                            <img src={item.imgUrl} alt={item.title} className="trending-img-relative" />
                        </div>
                        <div className="trending-img-absolute"></div>
                        <div className="trending-img-absolute-1">
                            <span className="text-white">{item.title}</span>
                            <div className="trending-meta-info">
                                {item.author} - {item.timestamp.toDate().toDateString()}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        ))}
      </OwlCarousel>
    </>
  )
}

export default Trending

