import React from "react";
import Footer from "./components/footer/footer";
import Body from './components/body/body'; 

function Main_page() {
  return (
     <>
    <div style={{display:'flex', justifyContent: 'center'}}>
    <Body/>
    </div>
    <Footer/>
    </>
  );
}

export default Main_page;
