import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Filters from "./components/Filter/Filter";


function App() {
  return (
    <>
      <Navbar />

      <div className="container mt-4">
        
        <div className="row">
          
          <div className="col-md-3">
            <Filters />
          </div>

          <div className="col-md-9"> </div>

        </div>

      </div>
    </>
  );
}

export default App;
