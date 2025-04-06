import React, {useState, useEffect} from 'react';
import BookInfo from './components/BookInfo/BookInfo';
import Header from '../layout/Header';
import RelatedBooks from './components/RelatedBooks/RelatedBooks';
import NotificationModal from '../NotificationModal/NotificationModal'; 

const data = 
   {
      id: 1,
      cover_image: "Book7.svg",
      title: "Если все кошки исчезднут",
      authors: "Гэнки Кавамура",
      price: "339",
      discounted_price: "300",
      ISBN: "978-5-04-181395-6",
      description: "Дни молодого почтальона сочтены. Оторванный от своей семьи и живущий один с со своим котом Капустой, он не был готов к страшному диагнозу: жить ему осталось всего несколько месяцев. Но прежде чем он сможет привести свои дела в порядок, появляется дьявол с очень необычным предложением. Темная сила обещает продлить умирающему жизнь, но в обмен за каждый дополнительный день одна вещь в мире будет исчезать бесследно... И вот начинается очень странная неделя, которая ставит молодого почтальона и его любимого кота на грань существования. С каждым исчезающим предметом почтальон размышляет о жизни, которую он прожил, о своих радостях и сожалениях, а также о людях, которых он любил и потерял.",
      year: "2025",
      copies: "3"
   };

const dataRelatedBooks = [
   {
      id_book: 1,
      cover_image: "Book1.svg",
      price: '321',
      title: 'Wayward son',
      authors: 'Rainbow Powell',
      discounted_price: '300',
   },
   {
      id_book: 2,
      cover_image: "Book2.svg",
      price: '456',
      title: 'Cinder',
      authors: 'Marisa Meyer',
      discounted_price: ''
   },
   {
      id_book: 3,
      cover_image: "Book3.svg",
      price: '257',
      title: 'Supernova',
      authors: 'Marisa Meyer',
      discounted_price: ''
   },
   {
      id_book: 4,
      cover_image: "Book4.svg",
      price: '127',
      title: 'The sunbearer trials',
      authors: 'Aiden Thomas',
      discounted_price: ''
   },
   {
      id_book: 5,
      cover_image: "Book5.svg",
      price: '478',
      title: 'Legend born',
      authors: 'Tracy Deonn',
      discounted_price: ''
   },
   {
      id_book: 6,
      cover_image: "Book6.svg",
      price: '562',
      title: 'Deadly',
      authors: 'Naomi Novik',
      discounted_price: '500'
   },
   {
      id_book: 7,
      cover_image: "Book1.svg",
      price: '321',
      title: 'Wayward son',
      authors: 'Rainbow Powell',
      discounted_price: ''
   },
   {
      id_book: 8,
      cover_image: "Book2.svg",
      price: '456',
      title: 'Cinder',
      authors: 'Marisa Meyer',
      discounted_price: ''
   },
   {
      id_book: 9,
      cover_image: "Book3.svg",
      price: '257',
      title: 'Supernova',
      authors: 'Marisa Meyer',
      discounted_price: ''
   },
   {
      id_book: 10,
      cover_image: "Book4.svg",
      price: '127',
      title: 'The sunbearer trials',
      authors: 'Aiden Thomas',
      discounted_price: ''
   }
]


function Details_page()
{
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
         {isModalOpen && (
        <NotificationModal onClose={closeModal} />
         )}         <BookInfo Book={data}/>
         <RelatedBooks RelatedBooks={dataRelatedBooks}/>
      </div>
   );
}

export default Details_page;