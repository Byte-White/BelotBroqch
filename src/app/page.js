'use client'

import Image from 'next/image'
import React, { useState } from 'react';

function getCardValue(karta, boq) {
  let result = 1;
  switch (boq) {
    case 0: // spatiq
      result = result << (31 - karta);
      break;
    case 1: // karo
      result = result << (23 - karta);
      break;
    case 2: // kupa
      result = result << (15 - karta);
      break;
    case 3: // pika
      result = result << (7 - karta);
      break;
    default:
      result = 0;
      break;
  }
  return result & 0xFFFFFFFF; //32 bit integer
}

export default function Home() {
  const [cards, setCards] = useState(0>>>0);
  const [tab, setTab] = useState(0);
  const [kozovaBoq, setKozovaBoq] = useState(0); //0-spatiq,1-karo,2-kupa,3-pika,4-bez koz,5-vsichko koz /kozova boq
  const [izbranaBoq, setIzbranaBoq] = useState(0); //0-spatiq,1-karo,2-kupa,3-pika,4-bez koz,5-vsichko koz/za da se opredeli kolko tochki e kartata
  const [chast, setChast] = useState(0); // chast 0 : 7,8,9,10; chast 1: J,Q,K,A
  const [tochki, setTochki] = useState(0);


  const handleReset = () => {
    setCards(0);
    setTab(0);
  };

  const handleKozovaBoqChange = (value) => {
    setKozovaBoq(value);
    setTab(1);
  };
  const handleIzbranaBoqChange = (value) => {
    setIzbranaBoq(value);
    setTab(2);
  };
  const handleKarta = (value) => {
    let temp;
    console.log("val="+value);
    switch(value){
      case '7':
        temp = cards | getCardValue(0,izbranaBoq);
        setCards(temp);
      break;
      case '8':
        temp = cards | getCardValue(1,izbranaBoq);
        setCards(temp);
      break;
      case '9':
        if((cards & getCardValue(2,izbranaBoq))===0)
        {
          if(izbranaBoq===kozovaBoq || kozovaBoq===5)setTochki(tochki+14);

          temp = cards | getCardValue(2,izbranaBoq);
          setCards(temp);
        }
      break;
      case '10':
        if((cards & getCardValue(3,izbranaBoq))===0)
        {
          setTochki(tochki+10);
          temp = cards | getCardValue(3,izbranaBoq);
          setCards(temp);
        }      
      break;
      case 'J':   
        if((cards & getCardValue(4,izbranaBoq))===0)
        {
          if(izbranaBoq==kozovaBoq || kozovaBoq==5)setTochki(tochki+20);
          else setTochki(tochki+2);
          temp = cards | getCardValue(4,izbranaBoq);
          setCards(temp);
        }
      break;
      case 'Q':
        if((cards & getCardValue(5,izbranaBoq))===0)
        {
          setTochki(tochki+3);
          temp = cards | getCardValue(5,izbranaBoq);
          setCards(temp);
        }
      break;
      case 'K': 
      if((cards & getCardValue(6,izbranaBoq))===0)
      {
        setTochki(tochki+4);
        temp = cards | getCardValue(6,izbranaBoq);
        setCards(temp);
      }
      break;
      case 'A': 
      if((cards & getCardValue(7,izbranaBoq))===0)
      {
        setTochki(tochki+11);
        temp = cards | getCardValue(7,izbranaBoq);
        setCards(temp);
      }
      break;
      default:
        console.error("Something went wrong");
        break;
    }
    setTab(1);
  };
  

  const renderTabContent = () => {
    if (tab === 0) //izbirane na kozova boq
    {
      return (
              <div>
                <h1 className>Izberi kozova boq:</h1>
                <div className='w-screen h-screen bg-blue-500 flex justify-center items-center'>
                  <div className="w-full h-full bg-blue-500 p-4">
                    <button className="w-full h-1/4 bg-black text-white p-4" onClick={() => handleKozovaBoqChange(0)}>♣️Spatiq</button>
                    <button className="w-full h-1/4 bg-red-700 text-white p-4" onClick={() => handleKozovaBoqChange(1)}>♦️Karo</button>
                    <button className="w-full h-1/4 bg-red-700 text-white p-4 " onClick={() => handleKozovaBoqChange(2)}>♥️Kupa</button>
                    <button className="w-full h-1/4 bg-black text-white p-4 " onClick={() => handleKozovaBoqChange(3)}>♠️Pika</button>
                 </div>
        
                  <div className="w-full h-full bg-blue-500 p-4">
                    <button className="w-full h-1/2 bg-black text-white p-4" onClick={() => handleKozovaBoqChange(4)}>🅰️Bez Koz</button>
                    <button className="w-full h-1/2 bg-red-700 text-white p-4" onClick={() => handleKozovaBoqChange(5)}>🃏Vsichko Koz</button>
                  </div>
                </div>
              </div>
              );
    } 
    else if (tab === 1) // izbirane na boq na kartata
    {
      return (
                <div>
                  <h1>tochki: {tochki} | minali karti:{(cards >>> 0).toString(2).padStart(32, '0')} <button className='bg-red-500 border p-2 border-white' onClick={() => handleReset()}>reset</button></h1>
                  <div className="w-screen h-screen bg-blue-500 p-4">
                    <button className="w-full h-1/4 bg-black text-white p-4" onClick={() => handleIzbranaBoqChange(0)}>♣️Spatiq</button>
                    <button className="w-full h-1/4 bg-red-700 text-white p-4" onClick={() => handleIzbranaBoqChange(1)}>♦️Karo</button>
                    <button className="w-full h-1/4 bg-red-700 text-white p-4 " onClick={() => handleIzbranaBoqChange(2)}>♥️Kupa</button>
                    <button className="w-full h-1/4 bg-black text-white p-4 " onClick={() => handleIzbranaBoqChange(3)}>♠️Pika</button>
                  </div>
                </div>
              );
    } 
    else if (tab === 2) //izbirane na chast
    {
      return (
        <div className="w-full h-full bg-blue-500 p-4">
                    <button className={"w-full h-1/2 text-white p-4  border border-white "+(izbranaBoq===1 || izbranaBoq===2 || izbranaBoq===5?'bg-red-700':'bg-black')} onClick={() => {setChast(0);setTab(3)}}>7,8,9,10</button>
                    <button className={"w-full h-1/2 text-white p-4  border border-white "+(izbranaBoq===1 || izbranaBoq===2 || izbranaBoq===5?'bg-red-700':'bg-black')} onClick={() => {setChast(1);setTab(3)}}>Vale, Dama, Pop, Aso</button>
        </div>
        );
    } 
    else if (tab === 3) //izbirane na karta
    {
      if(chast===0)
      {
        return (
        <div className='w-screen h-screen bg-blue-500 flex justify-center items-center'>
          <div className="w-full h-full bg-blue-500 p-4">
                      <button className={"w-full h-1/2 text-white p-4  border border-white "+(izbranaBoq===1 || izbranaBoq===2 || izbranaBoq===5?'bg-red-700':'bg-black')} onClick={() => handleKarta('7')}>7</button>
                      <button className={"w-full h-1/2 text-white p-4  border border-white "+(izbranaBoq===1 || izbranaBoq===2 || izbranaBoq===5?'bg-red-700':'bg-black')} onClick={() => handleKarta('9')}>9</button>
                    </div>
                    <div className="w-full h-full bg-blue-500 p-4">
                      <button className={"w-full h-1/2 text-white p-4  border border-white "+(izbranaBoq===1 || izbranaBoq===2 || izbranaBoq===5?'bg-red-700':'bg-black')} onClick={() => handleKarta('8')}>8</button>
                      <button className={"w-full h-1/2 text-white p-4  border border-white "+(izbranaBoq===1 || izbranaBoq===2 || izbranaBoq===5?'bg-red-700':'bg-black')} onClick={() => handleKarta('10')}>10</button>
                    </div>
        </div>);
      }
      else
      {
        return (
          <div className='w-screen h-screen bg-blue-500 flex justify-center items-center'>
            <div className="w-full h-full bg-blue-500 p-4">
                        <button className={"w-full h-1/2 text-white p-4  border border-white "+(izbranaBoq===1 || izbranaBoq===2 || izbranaBoq===5?'bg-red-700':'bg-black')} onClick={() => handleKarta('J')}>J</button>
                        <button className={"w-full h-1/2 text-white p-4  border border-white "+(izbranaBoq===1 || izbranaBoq===2 || izbranaBoq===5?'bg-red-700':'bg-black')} onClick={() => handleKarta('K')}>K</button>
                      </div>
                      <div className="w-full h-full bg-blue-500 p-4">
                        <button className={"w-full h-1/2 text-white p-4  border border-white "+(izbranaBoq===1 || izbranaBoq===2 || izbranaBoq===5?'bg-red-700':'bg-black')} onClick={() => handleKarta('Q')}>Q</button>
                        <button className={"w-full h-1/2 text-white p-4  border border-white "+(izbranaBoq===1 || izbranaBoq===2 || izbranaBoq===5?'bg-red-700':'bg-black')} onClick={() => handleKarta('A')}>A</button>
                      </div>
          </div>);
      }
    }
    // Add more tabs as needed
  };
  //<a>{(cards >>> 0).toString(2).padStart(32, '0')}</a>
  return (
    <div className='bg-blue-800 w-screen h-screen'>
      
      {renderTabContent()}
    </div>
  )
}
