import React from "react";
import './block.css'
import book from '../../images/book.png'

const Block = ({ content }) => { // Добавляем props content
    return (
      <div className="block">
        <div className="frame1">
          <img src={book} alt="" />
          <div className="frame2">
            {content} {/* Выводим контент из props */}
          </div>
        </div>
      </div>
    );
  };

  export default Block;
