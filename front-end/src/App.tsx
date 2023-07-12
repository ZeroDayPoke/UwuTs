// frontend/src/App.tsx

import { useEffect, useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar, Footer, SidePane } from "./components";
import { Home, About, Contact, SignUp, LogIn, Account, Admin } from "./pages";
import "./App.css";

function App() {
  const [selectedItem, setSelectedItem] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logo = "./src/assets/logo.png";
  const primaryItems = ["Home", "About", "Contact", "Help"];
  const guestItems = ["Login", "SignUp"];
  const userItems = ["Logout", "Account", "Admin"];
  const leftFooterItems = ["Terms", "Privacy"];
  const rightFooterItems = ["Facebook", "Twitter", "Instagram"];
  const sidePaneItems = primaryItems.concat(
    isLoggedIn ? userItems : guestItems
  );

  const onItemSelect = (item: string, index: number) => {
    console.log(item, index);
    setSelectedItem(item);

    if (item === "Logout") {
      fetch("http://localhost:3100/users/logout", {
        method: "POST",
        credentials: "include",
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setIsLoggedIn(data.isLoggedIn))
      .catch(error => console.error('There was a problem with your fetch operation: ', error));
    } else {
      checkSessionStatus();
    }
  };

  // Check session status function
  const checkSessionStatus = useCallback(() => {
    fetch("http://localhost:3100/users/session-status", {
      credentials: "include",
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => setIsLoggedIn(data.isLoggedIn))
    .catch(error => console.error('There was a problem with your fetch operation: ', error));
  }, []);

  // Check session status on initial load
  useEffect(() => {
    checkSessionStatus();
  }, [checkSessionStatus]);

  return (
    <Router>
      <div className="App">
        <NavBar
          logo={logo}
          primaryItems={primaryItems}
          secondaryItems={isLoggedIn ? userItems : guestItems}
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
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/login"
                element={<LogIn onLogin={checkSessionStatus} />}
              />
              <Route path="/account" element={<Account />} />
              <Route path="/admin" element={<Admin />} />
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
