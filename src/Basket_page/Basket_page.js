import React, { useState } from 'react';
import NotificationModal from '../NotificationModal/NotificationModal';
import Header from '../layout/Header.js';
import Footer from "../components/footer/footer";
import ListProductsInBasket from './ListProductsInBasket/ListProductsInBasket.jsx';
import ResultConteiner from './ResultConteiner/ResultConteiner.jsx';
import "./Basket_page.css";
import DeleteAllBasketButton from './DeleteAllBasketButton/DeleteAllBasketButton.jsx';

const BasketPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', alignItems: 'center' }}>
            <Header onOpenModal={openModal} />
            {isModalOpen && <NotificationModal onClose={closeModal} />}
            <div className='basket_container'>
                <div className='basket_header'>
                    <div className='name_numberOfProducts'>
                        <p style={{fontSize: 24, color: "#5D3C64"}}>КОРЗИНА</p>
                        <p style={{fontSize: 14, color: "#777777"}}>2 ТОВАРА</p>
                    </div>
                    <DeleteAllBasketButton />
                </div>
                <div className='all_products'>
                    <p>Все товары</p>
                </div>
                <div className='conteinerDown'>
                    <div className='ListProductsInBasketConteiner'>
                        <ListProductsInBasket />
                    </div>
                    <ResultConteiner />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default BasketPage;
