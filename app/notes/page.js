import React from 'react'
import "./notes.css"



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

            <div className="sidepane glassblur">
                <div className="profile">

                </div>
                <div className="notes ">
                    <a href="/">
                        <h1>Title</h1>
                        <p>Dashboard</p>
                    </a>
                </div>
                <div className="notes">
                    <a href="/">
                        <h1>Title</h1>
                        <p>Notes</p>
                    </a>
                </div>     <div className="notes">
                    <a href="/">
                        <h1>Title</h1>
                        <p>Reminders</p>
                    </a>
                </div>
                <div className="notes">
                    <a href="/">
                        <h1>Title</h1>
                        <p>To-do Lists</p>
                    </a>
                </div>
                <div className="notes">
                    <a href="/">
                        <h1>Title</h1>
                        <p>To-do Lists</p>
                    </a>
                </div>



      

            </div>
        </div>
    </div>
    </>

  )
}

export default page