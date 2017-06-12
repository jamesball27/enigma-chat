import React from 'react';
import Slider from 'react-slick';

class Rotor extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    const settings = {
      accessibility: true,
      arrows: false,
      infinite: true,
      slidesToShow: 3,
      centerMode: true,
      draggable: true,
      focusOnSelect: true,
      swipeToSlide: true,
      className: 'rotor'
    };


    return(
      <Slider {...settings} >
        {
          this.props.rotor.alphabet.map((letter, idx) => (
            <div key={ idx } className="rotorItem"><h4>{ letter }</h4></div>
          ))
        }
      </Slider>
    );
  }
}

export default Rotor;
