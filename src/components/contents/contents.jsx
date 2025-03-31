import React from "react";
import './contents.css';
import books from '../../images/books.png';

const Contents = () => (
    <div className="contents">
        <div className="text">
            <p style={{ fontWeight: 700, fontSize: '60px', lineHeight: '64px' }}>
                Book house - <br />
                Больше, чем просто книги
            </p>
            <p style={{ fontWeight: 500, fontSize: '20px', lineHeight: '30px' }}>
                Широкий выбор, выгодные цены, быстрая доставка и отличный сервис.{' '}
                <br />
                Все, что нужно для настоящих книголюбов
            </p>
            <button className="buttonCatalog">Перейти к каталогу книг</button>
        </div>
        <div className="imageBooks">
            <img src={books} alt="" />
        </div>
    </div>
);

export default Contents;