import React from "react";
import Footer from "./components/footer/footer";
import Body from './components/body/body'; 
import Header from './layout/Header'; 


function Main_page() {
  return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        margin: 0
      }}>
    <Header/>
    <Body/>
    <Footer/>
    </div>
  );
}

export default Main_page;
