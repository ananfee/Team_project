import React, { useState } from 'react';
import './question.css'; // Импортируем стили
import arrowDown from '../../images/Vector.png'; // Путь к изображению стрелки вниз

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <div 
        className={`faq-question ${isOpen ? 'active' : ''}`} // Добавляем класс active
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <img
          src={arrowDown} // Изображение стрелки
          alt="arrow"
          className={`arrow ${isOpen ? 'open' : ''}`}
        />
      </div>
      {isOpen && (
        <div className="faq-answer">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default FAQItem;
