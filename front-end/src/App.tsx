import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar, Footer, SidePane } from "./components";
import { Home, About, Contact, SignUp, LogIn, Account } from "./pages";

function App() {
  const [selectedItem, setSelectedItem] = useState("");

  const primaryItems = ["Home", "About", "Contact", "Help"];
  const secondaryItems = ["Logout", "Login", "SignUp", "Account"];
  const logo = "../logo.png";
  const leftFooterItems = ["Terms", "Privacy"];
  const rightFooterItems = ["Facebook", "Twitter", "Instagram"];
  const sidePaneItems = primaryItems.concat(secondaryItems);

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
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/account" element={<Account />} />
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
