import React from "react";
import './body.css'
import Block from "../block/block";
import Contents from "../contents/contents";
import FAQItem from "../question/question";
// import Header from "../header/header";

const Body = () => {
    const blockContent = [
      <>
        <p style={{ fontSize: '20px', fontWeight: 500 }}>Более книг</p>
        <p style={{ fontSize: '12px', fontWeight: 500 }}>
          В нашем каталоге вы найдете литературу на любой вкус: от мировых
          бестселлеров до редких изданий
        </p>
      </>,
      <>
        <p style={{ fontSize: '20px', fontWeight: 500 }}>Быстрая доставка по всей стране</p>
        <p style={{ fontSize: '12px', fontWeight: 500 }}>
        Доставим ваш заказ в кратчайшие сроки удобным для вас способом
        </p>
      </>,
      <>
        <p style={{ fontSize: '20px', fontWeight: 500 }}>Выгодные цены и скидки</p>
        <p style={{ fontSize: '12px', fontWeight: 500 }}>
        Мы предлагаем лучшие цены на книги и регулярно проводим акции
        </p>
      </>
    ];
  
    const blocks = blockContent.map((content, index) => (
      <Block key={index} content={content} />
    ));

    const questionsAndAnswers = [
      { question: 'Вопрос 1', answer: 'Утро выдалось чистым и ясным, свежесть напоминала о близящемся конце лета. Они выехали на рассвете, чтобы поглядеть, как этому типу отрубят голову; их было двадцать человек, и Бран ехал среди них, нервничая от возбуждения. Впервые лорд-отец и братья сочли его достаточно взрослым, чтобы лицезреть совершенство королевского правосудия. Шел девятый год лета – и седьмой в жизни Брана.' },
      { question: 'Вопрос 2', answer: 'Ответ на вопрос 2' },
    ];


  return (
    <div className="body">
      {/* <Header/> */}
        <Contents />
        <div className="containers">{blocks}</div>
        <div className="faq">
                <p style={{ fontWeight: 500 }}>Часто задаваемые вопросы</p>
                <div className="questions">
                    {questionsAndAnswers.map((item, index) => (
                        <FAQItem key={index} question={item.question} answer={item.answer} />
                    ))}
                </div>
            </div>
    </div>
  );
};

export default Body;

