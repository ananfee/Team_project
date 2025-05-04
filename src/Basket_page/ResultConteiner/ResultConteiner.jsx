import React from 'react';
import './ResultConteiner.css'
import PlaceOrderButton from '../PlaceOrderButton/PlaceOrderButton.jsx';


const ResultConteiner = () => {
    return (
        <div className='resultConteiner'>
            <div className='conteinerDop'>
                <p style={{fontSize:24}}>К оплате</p>
                <div className='infoText'>
                    <div className='resultProductPrice'>
                        <p style={{fontSize:16}}>2 товара</p>
                        <p style={{fontSize:16}}>678 ₽</p>
                    </div>
                    <div className='resultProductPrice'>
                        <p style={{fontSize:16}}>Скидка</p>
                        <p style={{fontSize:16, color: "#ED0006"}}>123 ₽</p>
                    </div>
                    <div className='resultProductPrice'>
                        <p style={{fontSize:16}}>Итого</p>
                        <p style={{fontSize:16}}>555 ₽</p>
                    </div>
                </div>
                <PlaceOrderButton />
            </div>
        </div>
    );
  };

  export default ResultConteiner;