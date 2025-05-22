import React from 'react';
// import './ListProductsInBasket.css';
import ProductInBasket from '../ProductInBasket/ProductInBasket.jsx';
import image1 from '../../images/image 1.png';
import image2 from '../../images/image 2.png'; 
import image3 from '../../images/image 3.png';


const ListProductsInBasket = () => {
  ListProductsInBasket.products = [ 
    { id: 1, title: 'Если все кошки в мире исчезнут', author: 'Гэнки Кавамура', price: 339, discounted_price: 300, cover_image: image1, count_of_book: 1, total_price: 450 },
    { id: 2, title: 'Вторая книга', author: 'Другой Автор', price: 279, discounted_price: 250, cover_image: image2, count_of_book: 1, total_price: 450 },
    { id: 3, title: 'Третья книга', author: 'Еще Автор', price: 419, discounted_price: 380, cover_image: image3, count_of_book: 1, total_price: 450 },
    // { id: 4, title: 'Третья книга', author: 'Еще Автор', price: 419, discounted_price: 380, cover_image: image3, count_of_book: 1, total_price: 450 },
    // ... другие продукты
  ];

  return (
    <div className="list-products-in-basket">
      {ListProductsInBasket.products.map(product => (
        <ProductInBasket key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ListProductsInBasket;

