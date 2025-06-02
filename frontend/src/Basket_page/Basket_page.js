import React, { useState } from 'react';
import NotificationModal from '../NotificationModal/NotificationModal';
import Header from '../layout/Header.js';
import Footer from "../components/footer/footer";
import ResultConteiner from './ResultConteiner/ResultConteiner.jsx';
import "./Basket_page.css";
import DeleteAllBasketButton from './DeleteAllBasketButton/DeleteAllBasketButton.jsx';
import DeleteAllBasketWindow from './DeleteAllBasketWindow/DeleteAllBasketWindow.jsx'; // Изменено название компонента
import {useEffect} from 'react';
import ProductInBasket from './ProductInBasket/ProductInBasket.jsx';
import FetchWithAuth from '../layout/LoginWindow/FetchWithAuth.js';
import image1 from '../images/image 1.png';
import image2 from '../images/image 2.png'; 


const BasketPage = () => {
    const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
    const [isDeleteAllWindowOpen, setIsDeleteAllWindowOpen] = useState(false);

    const [basketItems, setBasketItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [totalItems, setTotalItems] = useState(0);
    const [totalOriginalPrice, setTotalOriginalPrice] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);

    // Вспомогательная функция для пересчета итогов
    // Обернута в useCallback, чтобы избежать лишних пересозданий, если передается как пропс
    const calculateTotals = useCallback((items) => {
        let newTotalItems = 0;
        let newTotalOriginalPrice = 0;
        let newTotalDiscount = 0;
        let newFinalPrice = 0;

        items.forEach(item => {
            const itemQuantity = item.count_of_book;
            newTotalItems += itemQuantity;

            const originalItemPrice = item.book.price || 0;
            const discountedItemPrice = item.book.discounted_price !== null && item.book.discounted_price !== undefined
                                      ? item.book.discounted_price
                                      : originalItemPrice;

            newTotalOriginalPrice += originalItemPrice * itemQuantity;
            newFinalPrice += discountedItemPrice * itemQuantity;
        });

        newTotalDiscount = newTotalOriginalPrice - newFinalPrice;

        setTotalItems(newTotalItems);
        setTotalOriginalPrice(newTotalOriginalPrice);
        setTotalDiscount(newTotalDiscount);
        setFinalPrice(newFinalPrice);
    }, []); // Пустой массив зависимостей, т.к. не использует внешних переменных

    // Функция для загрузки данных корзины
    // Обернута в useCallback, чтобы избежать лишних пересозданий
    const loadBasket = useCallback(async () => {
        setLoading(true);
        try {
            const response = await FetchWithAuth('http://127.0.0.1:8000/catalog/get_cart/', {
                method: 'GET',
            });

            if (response === null) {
                throw new Error("Не удалось обновить токен авторизации или получить ответ.");
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData?.detail || `Ошибка загрузки корзины: ${response.status}`);
            }

            const data = await response.json();
            const items = data.items || [];
            setBasketItems(items);
            calculateTotals(items); // Пересчитываем итоги после загрузки
        } catch (err) {
            setError(err.message);
            console.error("Ошибка загрузки корзины:", err);
            setBasketItems([]); // Очистить корзину в UI, если произошла ошибка загрузки
            calculateTotals([]); // Обнулить итоги
        } finally {
            setLoading(false);
        }
    }, [calculateTotals]); // Зависимость от calculateTotals

    // Загрузка корзины при монтировании компонента
    useEffect(() => {
        loadBasket();
    }, [loadBasket]); // Зависимость от loadBasket

    // --- Обработчики модальных окон ---
    const openNotificationModal = () => {
        setIsNotificationModalOpen(true);
    };

    const closeNotificationModal = () => {
        setIsNotificationModalOpen(false);
    };

    const openDeleteAllWindow = () => {
        setIsDeleteAllWindowOpen(true);
    };

    const closeDeleteAllWindow = () => {
        setIsDeleteAllWindowOpen(false);
    };

    // --- ФУНКЦИЯ УДАЛЕНИЯ ОТДЕЛЬНОГО ТОВАРА ---
    // Обернута в useCallback
    const handleDeleteItem = useCallback(async (bookIdToDelete) => {
        try {
            const response = await FetchWithAuth('http://127.0.0.1:8000/catalog/cart/remove/', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ book_id: parseInt(bookIdToDelete, 10) }) // <-- Убеждаемся, что ID - число
            });

            if (response === null) {
                throw new Error("Не удалось обновить токен авторизации.");
            }

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData?.detail || `Ошибка удаления товара: ${response.status} ${response.statusText}`;
                throw new Error(errorMessage);
            }

            const updatedBasketItems = basketItems.filter(item => item.book?.id !== bookIdToDelete);
            setBasketItems(updatedBasketItems);
            calculateTotals(updatedBasketItems);
        } catch (error) {
            console.error("Ошибка при удалении товара из корзины:", error);
            // Показать сообщение об ошибке пользователю
        }
    }, [basketItems, calculateTotals]);

    // --- ИСПРАВЛЕННАЯ ФУНКЦИЯ ОЧИСТКИ ВСЕЙ КОРЗИНЫ ---
    // Теперь она отправляет запрос на сервер и перезагружает корзину
    const handleClearBasket = useCallback(async () => {
        try {
            // Предполагаем, что у вас есть эндпоинт для полной очистки корзины на сервере
            // URL и метод могут отличаться в вашем API
            const response = await FetchWithAuth('http://127.0.0.1:8000/catalog/cart/clear/', { // <-- Возможно, вам нужен другой URL или метод
                method: 'POST', // Или 'DELETE', в зависимости от вашего API
            });

            if (response === null) {
                throw new Error("Не удалось обновить токен авторизации при очистке корзины.");
            }
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData?.detail || `Ошибка очистки корзины: ${response.status} ${response.statusText}`);
            }

            // После успешной очистки на сервере, перезагружаем корзину, чтобы UI был синхронизирован
            await loadBasket();
            // Опционально: показать уведомление об успешной очистке
            // openNotificationModal("Корзина успешно очищена!");
        } catch (error) {
            console.error("Ошибка при очистке корзины:", error);
            // Опционально: показать сообщение об ошибке пользователю
            // openNotificationModal(`Ошибка очистки: ${error.message}`);
        }
    }, [loadBasket]);


    // --- ИСПРАВЛЕННАЯ ФУНКЦИЯ ИЗМЕНЕНИЯ КОЛИЧЕСТВА ТОВАРА ---
    // Обернута в useCallback
    const handleQuantityChange = useCallback(async (bookIdToUpdate, newQuantity) => {
        // Убедимся, что newQuantity является числом и больше 0
        const parsedQuantity = parseInt(newQuantity, 10);
        if (isNaN(parsedQuantity) || !Number.isFinite(parsedQuantity) || parsedQuantity < 1) {
            console.warn("Некорректное или недопустимое количество:", newQuantity);
            // Если количество стало 0 или меньше, можно удалить товар
            if (parsedQuantity <= 0) {
                handleDeleteItem(bookIdToUpdate); // Вызываем функцию удаления
            }
            return;
        }

        try {
            // КЛЮЧЕВОЕ ИСПРАВЛЕНИЕ: Убеждаемся, что book_id и count_of_book являются числами
            const response = await FetchWithAuth("http://127.0.0.1:8000/catalog/cart/update/", {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    book_id: parseInt(bookIdToUpdate, 10), // <-- Убеждаемся, что ID - число
                    count_of_book: parsedQuantity          // <-- Убеждаемся, что количество - число
                })
            });

            if (response === null) {
                throw new Error("Не удалось обновить токен авторизации.");
            }

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData?.detail || `Ошибка обновления количества: ${response.status} ${response.statusText}`;
                throw new Error(errorMessage);
            }

            const updatedBasketItems = basketItems.map(item =>
                item.book?.id === bookIdToUpdate
                    ? { ...item, count_of_book: parsedQuantity, total_price: (item.book.discounted_price || item.book.price) * parsedQuantity }
                    : item
            );
            setBasketItems(updatedBasketItems);
            calculateTotals(updatedBasketItems);

        } catch (error) {
            console.error("Ошибка при изменении количества товара:", error);

        }
    }, [basketItems, calculateTotals, handleDeleteItem]); // Добавил handleDeleteItem в зависимости для вызова при quantity <= 0


    if (loading) return <div className="loading-message">Загрузка корзины...</div>;
    if (error) return <div className="error-message">Ошибка: {error}</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', alignItems: 'center' }}>
            <Header onOpenModal={openNotificationModal} />
            {isNotificationModalOpen && <NotificationModal onClose={closeNotificationModal} />}
            {/* TODO: Передать логику удаления всех товаров в DeleteAllBasketWindow */}
            {isDeleteAllWindowOpen && <DeleteAllBasketWindow onClose={closeDeleteAllWindow} isOpen={isDeleteAllWindowOpen} />}

            <div className='basket_container'>
                <div className='basket_header'>
                    <div className='name_numberOfProducts'>
                        <p style={{ fontSize: 24, color: "#5D3C64" }}>КОРЗИНА</p>
                    </div>
                    {/* Отображаем кнопку "Удалить все" только если корзина не пуста */}
                    {basketItems.length > 0 && (
                        <DeleteAllBasketButton onOpenDeleteWindow={openDeleteAllWindow}  onClose={closeDeleteAllWindow} onClearBasket={handleClearBasket} />
                    )}
                </div>

                <div className='all_products'>
                     {/* Отображаем текст "Все товары" только если корзина не пуста */}
                    {basketItems.length > 0 && (
                        <p>Все товары</p>
                    )}
                </div>

                <div className='conteinerDown'>
                    {/*
                       Рендерим список ProductInBasket напрямую, используя map.
                       Каждый ProductInBasket отвечает за отображение одной позиции (книги и ее количества).
                    */}
                    <div className='ListProductsInBasketConteiner'> {/* Сохраняем контейнер для стилей */}
                        {basketItems.length > 0 ? (
                            // Перебираем массив basketItems
                            basketItems.map(item => ( // item - это объект { book: {...}, count_of_book: ..., total_price: ... }
                                // Важно использовать уникальный key для каждого элемента списка.
                                // Используем book.id из вложенного объекта книги.
                                // Проверяем наличие book и id для надежности.
                                <ProductInBasket
                                    key={item.book?.id || `item-${item.id}`} // Если book.id недоступен, используем резервный ключ
                                    book={item.book} // Передаем объект книги
                                    count_of_book={item.count_of_book} // Передаем количество этой книги
                                    total_price={item.total_price} // Передаем общую цену за эту позицию (из API - опционально, но может быть полезно)
                                    // TODO: Передать обработчики удаления и изменения количества
                                    onDelete={() => handleDeleteItem(item.book?.id)} // Передать функцию handleDeleteItem
                                    onQuantityChange={(newQuantity) => handleQuantityChange(item.book?.id, newQuantity)} // Передать функцию handleQuantityChange
                                />
                            ))
                        ) : (
                            !loading && <div className="empty-basket-message">Ваша корзина пуста.</div>
                        )}
                    </div>

                    {basketItems.length > 0 && (
                        <ResultConteiner
                            totalItems={totalItems}
                            totalOriginalPrice={totalOriginalPrice}
                            totalDiscount={totalDiscount}
                            finalPrice={finalPrice}
                            onClearBasket={handleClearBasket}
                        />
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default BasketPage;
