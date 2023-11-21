import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

import './App.css';

// import required modules
import { EffectCards } from 'swiper/modules';

export default function App() {

  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch('https://api.gameofthronesquotes.xyz/v1/random/10')
      .then(res => res.json())
      .then(data =>
        setTimeout(() => {
          setCharacters(data);
        }, 1000),
      )
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    console.log([...characters]);
  }, [characters]);

  const returnOnlyHouse = (house) => {
    if(house === null){
      return '';
    }
    const houseArr = house.split(' ');
    console.log(houseArr);
    const index = houseArr.findIndex(e => e === 'of');
    console.log(index);
    const resultOut = houseArr.slice(0, index);
    console.log(resultOut);
    const result = resultOut.map(ele => ele + " ");
    console.log(result);
    const newHouse = result.join(' ');

    return 'of '+ newHouse;
  }

  return (
    <>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        {characters.map(character =>{
          return (<SwiperSlide>
            <div className='inside-card'>
              <p className='quote'>"{character.sentence}"</p>
              <p>— {character.character.name} {returnOnlyHouse(character.character.house.name)} </p>
            </div>
          </SwiperSlide>)
        })}

      </Swiper>
    </>
  );
}
