import React from 'react'
import "./to-do.css"



const page = () => {
  return (
    <>
    <div className="main">
        <div className="blur"></div>
        <div className="tealblob2"></div>
      <div className="purblob2"></div>


      <div className="pane glassblur">
        <div className="toolbar"></div>
        <div className="noise"></div>

        <div className="all-lists">
            <div className="list"></div>
            <div className="list"></div>
            <div className="list"></div>
            <div className="list"></div>
            <div className="list"></div>
            <div className="list"></div>
            <div className="list"></div>
        </div>


        <button className='add'>+</button>
        </div>
    </div>
    </>

  )
}

export default page