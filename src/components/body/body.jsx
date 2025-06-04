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
      { question: 'Как я могу найти конкретную книгу на вашем сайте?', 
        answer: 'Найти интересующую вас книгу очень просто! Перейдите в раздел "Каталог", где вы сможете отфильтровать книги по различным категориям, а также отсортировать по цене. Также можно вопользоваться поиском: введите название книги или имя автора в строку поиска, расположенную в верхней части "Каталога". Начните вводить, и мы предложим вам варианты, соответствующие вашему запросу.' },
      { question: 'Как я могу отменить свой заказ?', answer: 'Если заказ еще не отправлен, свяжитесь с поддержкой по телефону +7 (777) 777 77 77 или электронной почте bookhouse@mail.ru. Сообщите номер вашего заказа, и мы постараемся помочь вам отменить его. Если заказ уже отправлен, к сожалению, отменить его напрямую невозможно. В этом случае вы можете отказаться от получения. При доставке курьером или в пункт выдачи вы можете просто отказаться от получения заказа.' },
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

