import React from 'react';
// import './ListProductsInBasket.css';
import ProductInBasket from '../ProductInBasket/ProductInBasket.jsx';
import image1 from '../../images/image 1.png';
import image2 from '../../images/image 2.png'; 
import image3 from '../../images/image 3.png';


const ListProductsInBasket = () => {
  ListProductsInBasket.products = [ 
    { id: 1, name: 'Если все кошки в мире исчезнут', author: 'Гэнки Кавамура', oldPrice: 339, newPrice: 300, image: image1 },
    { id: 2, name: 'Вторая книга', author: 'Другой Автор', oldPrice: 279, newPrice: 250, image: image2 },
    { id: 3, name: 'Третья книга', author: 'Еще Автор', oldPrice: 419, newPrice: 380, image: image3 },
    // { id: 4, name: 'Третья книга', author: 'Еще Автор', oldPrice: 419, newPrice: 380, image: image3 },
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

