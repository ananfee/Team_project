import React from 'react';
import './ProductInBasket.css'
import image1 from '../../images/image 1.png';
import NumberProducts from '../NumberProducts/NumberProducts.jsx';
import DeleteButton from '../DeleteButton/DeleteButton.jsx';

// const ProductInBasket = () => {
//     return (
//         <div className='product_container'>
//             <div className='conteinerImgInfo'>
//                 <div className='imgProduct'>
//                     <img src={image1} alt="" />
//                 </div>
//                 <div className='conteiner0'>
//                     <div className='infoBook'>
//                         <p style={{fontSize: 16, color: "#000000"}}>Если все кошки в мире исчезнут</p>
//                         <p style={{fontSize: 14, color: "#777777"}}>Гэнки Кавамура</p>
//                     </div>
//                     <NumberProducts />
//                 </div>
//             </div>
//             <div className='conteiner00'>
//                 <div className='priceProduct'>
//                     <p style={{color: "#777777", textDecoration: 'line-through', 
//                     textDecorationColor: 'red',}}>339 ₽</p>
//                     <p style={{fontWeight: 500}}>300 ₽</p>
//                 </div>
//                 <DeleteButton />
//             </div>
//         </div>

//     );
//   };

//   export default ProductInBasket;

  
const ProductInBasket = ({ name, author, oldPrice, newPrice, image }) => { // Принимаем пропсы
    return (
        <div className='product_container'>
            <div className='conteinerImgInfo'>
                <div className='imgProduct'>
                    <img src={image} alt={name} /> {/* Используем пропс image */}
                </div>
                <div className='conteiner0'>
                    <div className='infoBook'>
                        <p style={{fontSize: 16, color: "#000000"}}>{name}</p> {/* Используем пропс name */}
                        <p style={{fontSize: 14, color: "#777777"}}>{author}</p> {/* Используем пропс author */}
                    </div>
                    <NumberProducts />
                </div>
            </div>
            <div className='conteiner00'>
                <div className='priceProduct'>
                    <p style={{color: "#777777", textDecoration: 'line-through', textDecorationColor: 'red'}}>{oldPrice} ₽</p> {/* Используем пропс oldPrice */}
                    <p style={{fontWeight: 500}}>{newPrice} ₽</p> {/* Используем пропс newPrice */}
                </div>
                <DeleteButton />
            </div>
        </div>
    );
};

export default ProductInBasket;