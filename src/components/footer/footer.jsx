import React from "react";
import './footer.css';
import wa from '../../images/whatsapp.png'
import fb from '../../images/facebook.png'
import yt from '../../images/youtube.png'
import pm from '../../images/google-play.png'
import visa from '../../images/Visa.png'
import mc from '../../images/Mastercard.png'

const Footer=()=>{
    return(
        <div className="footer">
            <div className ="sb__footer">
                <div className="cont">
                    <p>Контактная информация</p>
                    <p>+7 (777) 777 77 77</p>
                    <p>bookhouse@mail.ru</p>
                </div>
                <div className="contacts">
                    <p>Присоединяйся к нам</p>
                        <div className="socialmedia">
                            <p><img src={wa} alt=""/></p>
                            <p><img src={fb} alt=""/></p>
                            <p><img src={yt} alt=""/></p>
                            <p><img src={pm} alt=""/></p>
                        </div>
                </div>
                <div className="pay">
                    <p>Принимаем все виды оплаты</p>
                        <div className="cards">
                            <p><img src={mc} alt=""/></p>
                            <p><img src={visa} alt=""/></p>
                        </div>
                </div>
                <div className="label">
                    <p>
                        @{new Date().getFullYear()} ООО "Book house".
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer;