import React, { useState } from 'react';
import './ProductInBasket.css'
import image1 from '../../images/image 1.png';
import NumberProducts from '../NumberProducts/NumberProducts.jsx';
import DeleteButton from '../DeleteButton/DeleteButton.jsx';
import DeleteProductWindow from '../DeleteProductWindow/DeleteProductWindow.jsx';

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

  
const ProductInBasket = ({ title, author, price, discounted_price, cover_image, total_price }) => { 
    const [isDeleteWindowOpen, setIsDeleteWindowOpen] = useState(false);

    const handleOpenDeleteWindow = () => {
        setIsDeleteWindowOpen(true);
    };

    const handleCloseDeleteWindow = () => {
        setIsDeleteWindowOpen(false);
    };
    
    return (
        <div className='product_container'>
            <div className='conteinerImgInfo'>
                <div className='imgProduct'>
                    <img src={cover_image} alt={title} /> {/* Используем пропс image */}
                </div>
                <div className='conteiner0'>
                    <div className='infoBook'>
                        <p style={{fontSize: 16, color: "#000000"}}>{title}</p> {/* Используем пропс name */}
                        <p style={{fontSize: 14, color: "#777777"}}>{author}</p> {/* Используем пропс author */}
                    </div>
                    <NumberProducts />
                </div>
            </div>
            <div className='conteiner00'>
                <div className='priceProduct'>
                    <p style={{color: "#777777", textDecoration: 'line-through', textDecorationColor: 'red'}}>{price} ₽</p> {/* Используем пропс oldPrice */}
                    <p style={{fontWeight: 500}}>{discounted_price} ₽</p> {/* Используем пропс newPrice */}
                </div>
                <div>
                    <DeleteButton onOpenModal={handleOpenDeleteWindow} /> {/* Передаем функцию */}
                    <DeleteProductWindow isOpen={isDeleteWindowOpen} onClose={handleCloseDeleteWindow} /> {/* Передаем состояние и onClose */}
                </div>
            </div>
        </div>
    );
};

export default ProductInBasket;