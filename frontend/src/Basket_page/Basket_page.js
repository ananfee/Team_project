import React, { useState, useEffect, useCallback } from 'react'; // <-- Добавлен useCallback
import NotificationModal from '../NotificationModal/NotificationModal';
import Header from '../layout/Header.js';
import Footer from "../components/footer/footer";
import ResultConteiner from './ResultConteiner/ResultConteiner.jsx';
import "./Basket_page.css";
import DeleteAllBasketButton from './DeleteAllBasketButton/DeleteAllBasketButton.jsx';
import DeleteAllBasketWindow from './DeleteAllBasketWindow/DeleteAllBasketWindow.jsx'; // Изменено название компонента
import ProductInBasket from './ProductInBasket/ProductInBasket.jsx';
import FetchWithAuth from '../layout/LoginWindow/FetchWithAuth.js';
const BasketPage = () => {
    const baseUrl = process.env.REACT_APP_API_URL;
    const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
    const [isDeleteAllWindowOpen, setIsDeleteAllWindowOpen] = useState(false);

    // Состояния для данных корзины
    const [basketItems, setBasketItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Состояния для рассчитанных итогов (для передачи в ResultConteiner)
    const [totalItems, setTotalItems] = useState(0);
    const [totalOriginalPrice, setTotalOriginalPrice] = useState(0); // Полная стоимость всех товаров без скидки
    const [totalDiscount, setTotalDiscount] = useState(0);           // Общая сумма скидки
    const [finalPrice, setFinalPrice] = useState(0);             // Итоговая стоимость всех товаров со скидкой

    // --- Обработчики модальных окон ---
    const openNotificationModal = () => {
        setIsNotificationModalOpen(true);
    };

    const closeNotificationModal = () => {
        setIsNotificationModalOpen(false);
    };

    const openDeleteAllWindow = () => {
        setIsDeleteAllWindowOpen(true);
        // TODO: Реализовать логику удаления всех товаров при подтверждении в DeleteAllBasketWindow
        // Используйте FetchWithAuth для API-вызова на удаление всех товаров.
        // После успешного удаления с сервера, очистить state: setBasketItems([]);
    };

    const closeDeleteAllWindow = () => {
        setIsDeleteAllWindowOpen(false);
    };

    // Вспомогательная функция для пересчета итогов
    const calculateTotals = (items) => {
        let newTotalItems = 0;
        let newTotalOriginalPrice = 0;
        let newTotalDiscount = 0;
        let newFinalPrice = 0;

        items.forEach(item => {
            const itemQuantity = item.count_of_book;
            newTotalItems += itemQuantity;

            // Предполагаем, что 'price' - это оригинальная цена, 'discounted_price' - цена со скидкой
            const originalItemPrice = item.book.price || 0;
            const discountedItemPrice = item.book.discounted_price !== null && item.book.discounted_price !== undefined
                                      ? item.book.discounted_price
                                      : originalItemPrice; // Если скидки нет, используем оригинальную цену

            newTotalOriginalPrice += originalItemPrice * itemQuantity;
            newFinalPrice += discountedItemPrice * itemQuantity;
        });

        newTotalDiscount = newTotalOriginalPrice - newFinalPrice;

        setTotalItems(newTotalItems);
        setTotalOriginalPrice(newTotalOriginalPrice);
        setTotalDiscount(newTotalDiscount);
        setFinalPrice(newFinalPrice);
    };

    const handleDeleteItem = async (bookIdToDelete) => {
        try {
            // Уточните URL и метод: Предполагаем, что API ожидает book_id в теле запроса DELETE
            const response = await FetchWithAuth(`${baseUrl}catalog/cart/remove/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json', // Обязательно для отправки JSON-тела
                },
                body: JSON.stringify({ book_id: bookIdToDelete })


// Отправляем ID книги в теле запроса
            });

            if (response === null) {
                throw new Error("Не удалось обновить токен авторизации.");
            }

            if (!response.ok) {
                const errorData = await response.json(); // Попробуйте получить сообщение об ошибке с сервера
                const errorMessage = errorData?.detail || `Ошибка удаления товара: ${response.status}`;
                throw new Error(errorMessage);
            }

            // Если удаление на сервере успешно, обновляем локальное состояние
            const updatedBasketItems = basketItems.filter(item => item.book?.id !== bookIdToDelete);
            setBasketItems(updatedBasketItems);
            calculateTotals(updatedBasketItems); // Пересчитываем итоги после удаления
            // Возможно, здесь можно показать уведомление об успешном удалении
        } catch (error) {
            console.error("Ошибка при удалении товара из корзины:", error);
            // Показать сообщение об ошибке пользователю, например, через NotificationModal
        }
    };

    const handleClearBasket = async () => {
    try {
        const response = await FetchWithAuth(`${baseUrl}catalog/cart/clear/`, {
            method: 'DELETE',
        });

        if (response === null) {
            throw new Error("Не удалось обновить токен авторизации.");
        }

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData?.detail || `Ошибка очистки корзины: ${response.status}`;
            throw new Error(errorMessage);
        }

        // Успешная очистка корзины на сервере
        setBasketItems([]);
        calculateTotals([]);
        // Добавляем обновление страницы (перезагрузку) после успешной очистки
        window.location.reload(); // Или используйте более подходящий метод обновления, если есть

    } catch (error) {
        console.error("Ошибка при очистке корзины:", error);
        // Показать сообщение об ошибке пользователю
    }
};
    // --- Логика загрузки данных корзины (выполняется один раз при монтировании) ---
    useEffect(() => {
        const loadBasket = async () => {
            try {
                setLoading(true);
                setError(null); // Сбрасываем ошибку перед новой попыткой

                // Используем вашу функцию FetchWithAuth
                const response = await FetchWithAuth(`${baseUrl}catalog/get_cart/`, {
                    method: 'GET', // Метод GET для получения данных
                    // Заголовок Authorization будет добавлен автоматически в FetchWithAuth
                    // 'Content-Type': 'application/json', // Обычно не нужен для GET-запросов, но не помешает
                });

                // FetchWithAuth вернет null, если не удалось обновить токен
                if (response === null) {
                     // Обработка ситуации, когда не удалось авторизоваться/обновить токен
                    throw new Error("Не удалось загрузить корзину: ошибка авторизации.");
                     // TODO: Возможно, перенаправить пользователя на страницу авторизации/логина
                }

                if (!response.ok) {
                    // Если статус ответа не 2xx после возможного обновления токена, выбрасываем ошибку
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                // Проверяем, что полученные данные - это массив
                if (Array.isArray(data)) {
                    setBasketItems(data); // Устанавливаем загруженные данные
                    calculateTotals(data.items || []); // Пересчитываем итоги после загрузки

                } else {
                    // Если данные не массив, это может быть ошибкой или пустым ответом
                    console.warn("Получены данные корзины не в формате массива:", data);
                    setBasketItems([]); // Устанавливаем пустой массив
                }

                setLoading(false);

            } catch (err) {
                console.error("Ошибка загрузки корзины:", err);
                setError(err);
                setLoading(false);
                setBasketItems([]); // Очищаем товары при ошибке
                 // TODO: Возможно, показать пользователю сообщение об ошибке
            }
        };

        loadBasket();
        // Пустой массив зависимостей: эффект выполняется только при первом рендере
        // Если корзина может меняться без перезагрузки страницы (например, через WebSocket или ручное обновление),
        // возможно, этот эффект должен зависеть от состояния пользователя или другого триггера.
    }, []);

    // --- Логика пересчета итогов (выполняется при изменении basketItems) ---
    // ЭТА ЧАСТЬ НЕ ИЗМЕНИЛАСЬ, ОНА УЖЕ КОРРЕКТНО РАБОТАЕТ С ФОРМАТОМ ВАШЕГО API
    useEffect(() => {
        // Проверяем, что basketItems является массивом и не null/undefined
        if (!Array.isArray(basketItems)) {
             // Это может произойти в начальном состоянии или при ошибке загрузки
            setTotalItems(0);
            setTotalOriginalPrice(0);
            setTotalDiscount(0);
            setFinalPrice(0);
            return; // Прекращаем выполнение эффекта, если данных нет или они некорректны
        }

        if (basketItems.length === 0) {
            // Если корзина пуста, обнуляем все итоги
            setTotalItems(0);
            setTotalOriginalPrice(0);
            setTotalDiscount(0);
            setFinalPrice(0);
            return;
        }

        let itemsCount = 0;           // Общее количество всех единиц товаров
        let originalTotal = 0;        // Сумма цен без скидки для всех товаров с учетом количества
        let finalBasketTotal = 0;     // Сумма цен со скидкой (или без, если скидки нет) для всех товаров с учетом количества

        // Перебираем каждый элемент в массиве basketItems
        basketItems.forEach(item => {
            // Получаем количество товара для текущего элемента, по умолчанию 0 если нет или некорректно
            const count = item.count_of_book || 0;
             // Получаем оригинальную цену за единицу, по умолчанию 0 если нет или некорректно
            const originalPricePerItem = item.book?.price || 0;
            // Получаем скидочную цену за единицу
            const discountedPricePerItem = item.book?.discounted_price;

            // Увеличиваем общий счетчик товаров на количество текущей позиции
            itemsCount += count;

            // Добавляем к полной стоимости (без скидки) цену этой позиции, умноженную на количество
            originalTotal += originalPricePerItem * count;

            // Определяем эффективную цену за единицу для расчета итоговой суммы корзины
            // Используем скидочную цену, только если она существует (не null/undefined) И меньше оригинальной
            // Если скидочной цены нет или она >= оригинальной, используем оригинальную цену
            const effectivePricePerItem = (discountedPricePerItem != null && discountedPricePerItem < originalPricePerItem)
                ? discountedPricePerItem // Если есть актуальная скидка, берем ее
                : originalPricePerItem; // Иначе берем полную цену

            // Добавляем к итоговой сумме корзины эффективную цену этой позиции, умноженную на количество
            finalBasketTotal += effectivePricePerItem * count;

             // ПРИМЕЧАНИЕ: Ваше API возвращает item.total_price, которое, судя по примеру,
             // является effectivePricePerItem * count. Можно было бы просто суммировать item.total_price
             // для finalBasketTotal.
             // finalBasketTotal += item.total_price || 0;
             // Но для totalOriginalPrice и totalDiscount вам все равно понадобятся originalPricePerItem и effectivePricePerItem.

        });

        // Сумма скидки = Полная цена всех товаров - Итоговая цена всех товаров со

        // Убеждаемся, что скидка не отрицательна (хотя при правильных данных API такого быть не должно)
        const totalDiscountAmount = Math.max(0, originalTotal - finalBasketTotal);

        // Обновляем состояния итогов
        setTotalItems(itemsCount);
        setTotalOriginalPrice(originalTotal);
        setFinalPrice(finalBasketTotal);
        setTotalDiscount(totalDiscountAmount); // Сумма скидки

        // Можно добавить логирование для отладки:
        // console.log("Пересчитаны итоги:", {
        //     totalItems: itemsCount,
        //     totalOriginalPrice: originalTotal,
        //     totalDiscount: totalDiscountAmount,
        //     finalPrice: finalBasketTotal
        // });

    }, [basketItems]); // Зависимость от basketItems - пересчитываем, когда массив товаров в корзине меняется

    // --- Обработка состояний загрузки и ошибки ---
    if (loading) {
        // Можете добавить свой спиннер загрузки или другой индикатор
        return <div className="basket-page-container loading-state" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>Загрузка корзины...</div>;
    }

    if (error) {
        // Отображаем сообщение об ошибке
        return <div className="basket-page-container error-state" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', color: 'red' }}>Ошибка при загрузке корзины: {error.message}</div>;
    }

    // --- Отображение страницы корзины ---
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
                    <div>
                        <DeleteAllBasketButton onOpenDeleteWindow={openDeleteAllWindow}/>
                        <DeleteAllBasketWindow isOpen={isDeleteAllWindowOpen} onClose={closeDeleteAllWindow} onClearBasket={handleClearBasket} />
                    </div>
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
                                <ProductInBasket key={item.book?.id || `item-${item.id}`} // Если book.id недоступен, используем резервный ключ
                                    book={item.book} // Передаем объект книги
                                    count_of_book={item.count_of_book} // Передаем количество этой книги
                                    total_price={item.total_price} // Передаем общую цену за эту позицию (из API - опционально, но может быть полезно)
                                    // TODO: Передать обработчики удаления и изменения количества
                                    onDelete={() => handleDeleteItem(item.book?.id)} // Передать функцию handleDeleteItem
                                    // onQuantityChange={(newQuantity) => handleQuantityChange(item.book?.id, newQuantity)} // Передать функцию handleQuantityChange
                                />
                            ))
                        ) : (
                            // Сообщение, если корзина пуста после загрузки
                            !loading && <div className="empty-basket-message">Ваша корзина пуста.</div>
                        )}
                    </div>

                    {/* Передаем рассчитанные итоги в ResultConteiner */}
                    {/* Отображаем ResultConteiner только если корзина не пуста */}
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