import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar, Footer, SidePane } from "./components";
import { Home, About, Contact, SignUp, LogIn, Account, Admin, TestimonialsPage } from "./pages";
import "./App.css";

function App() {
  const [selectedItem, setSelectedItem] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logo = "./src/assets/logo.png";
  const primaryItems = ["Home", "About", "Contact", "Help", "Testimonials"];
  const guestItems = ["Login", "SignUp"];
  const userItems = ["Logout", "Account", "Admin"];
  const leftFooterItems = ["Terms", "Privacy"];
  const rightFooterItems = ["Facebook", "Twitter", "Instagram"];
  const sidePaneItems = primaryItems.concat(
    isLoggedIn ? userItems : guestItems
  );

  // Check session on initial load
  useEffect(() => {
    fetch("http://localhost:3100/users/checkSession", {
      method: "GET",
      credentials: "include",
    })
      .then(response => {
        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch(error => console.error('There was a problem checking session: ', error));
  }, []);

  const onItemSelect = (item: string) => {
    setSelectedItem(item);

    if (item === "Logout") {
      fetch("http://localhost:3100/users/logout", {
        method: "POST",
        credentials: "include",
      })
        .then(response => {
          if (response.ok) {
            setIsLoggedIn(false);
          }
        })
        .catch(error => console.error('There was a problem with the logout operation: ', error));
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

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
              <Route path='/testimonials' element={<TestimonialsPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LogIn onLogin={handleLoginSuccess} />} />
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
