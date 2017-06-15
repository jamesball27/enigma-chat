import React from 'react';
import Slider from 'react-slick';
import RotorUtil from '../util/enigma/rotor';

class Rotor extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(currentSlide, nextSlide) {
    const rotors = {
      [`rotor${this.props.rotorNumber}`]: new RotorUtil(this.props.rotorNumber, nextSlide)
    };

    this.props.receiveNewRotors(rotors);
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.slider.slickGoTo(this.props.rotor.startingPosition);
    }, 500);
  }

  render() {

    const settings = {
      useCSS: true,
      accessibility: true,
      arrows: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: true,
      draggable: true,
      focusOnSelect: true,
      swipeToSlide: true,
      className: 'rotor',
      beforeChange: this.handleChange,
      initialSlide: this.props.rotor.startingPosition
    };


    return(
      <Slider ref={ slider => this.slider = slider } {...settings} >
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
