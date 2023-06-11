import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import SidePane from "./components/SidePane";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  const [selectedItem, setSelectedItem] = useState("");

  const primaryItems = ["Home", "About", "Contact"];
  const secondaryItems = ["Help", "Login"];
  const logo = "./favicon.ico";
  const leftFooterItems = ["Terms", "Privacy"];
  const rightFooterItems = ["Facebook", "Twitter", "Instagram"];
  const sidePaneItems = ["Profile", "Settings", "Logout"];

  const onItemSelect = (item: string, index: number) => {
    console.log(item, index);
    setSelectedItem(item);
  };

  return (
    <Router>
      <div className="App">
        <NavBar
          logo={logo}
          primaryItems={primaryItems}
          secondaryItems={secondaryItems}
          onItemSelect={onItemSelect}
          selectedItem={selectedItem}
        />
        <div className="app-body">
          <SidePane
            items={sidePaneItems}
            onItemSelect={onItemSelect}
            selectedItem={selectedItem}
          />
          <div className="main-view">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </div>
        <Footer
          leftItems={leftFooterItems}
          rightItems={rightFooterItems}
          onItemSelect={onItemSelect}
        />
      </div>
    </Router>
  );
}

export default App;
