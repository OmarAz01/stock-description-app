import React, { useState, useEffect } from "react"
import axios from "axios"

import "./App.css"



function App() {

  const [ticker, setTicker] = useState([])
  const [search, setSearch] = useState("")

  const key = import.meta.env.VITE_APIKEY

  const URL = `https://g-finance.p.rapidapi.com/ticker/?rapidapi-key=${key}&t=${search}:nasdaq`

  const fetchTicker = (e) => {
    e.preventDefault()

    axios.get(URL).then(response => {setTicker(response.data)}).catch(error => {window.alert('That ticker does not exist')})
    
  }

  return (
    <>
      <form className="search" onSubmit={fetchTicker}>
        <input type="text" value={search} placeholder="Enter A Ticker Here..." onChange={(e) => setSearch(e.target.value)}/>
      </form>

      <div className="stock">
        <h1 className="ticker">{ticker.about ? ticker.about.symbol : 'TICKER'}</h1>
        <h2 className="stockName">{ticker.info ? ticker.info.title : null}</h2>
      </div>

      <div className="rollingPrice">
        {ticker.info ? <>
         <p>last: {ticker.price.last.value} </p>
         <p>previous close: {ticker.price.previous_close}</p> 
         <p>todays change: {ticker.price.last.today_change} </p> 
         <p>volume: {ticker.stats.volume} </p> 
         </> : null}
      </div>

      <div className="description"> {ticker.about ? ticker.about.description : null}</div>


      
    </>
  )
}

export default App
