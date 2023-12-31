import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [squareFootage, setSquareFootage] = useState(0);
  const [yearBuilt, setYearBuilt] = useState(1990);
  const [numberBathrooms, setNumberBathrooms] = useState(1);
  const [numberBedrooms, setNumberBedrooms] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // home object
    const newHome = {
      street,
      city,
      state,
      zipcode,
      squareFootage,
      yearBuilt,
      numberBathrooms,
      numberBedrooms,
    };

    // Send a POST request to the /homes endpoint
    const response = await fetch("http://localhost:3100/homes/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newHome),
      credentials: "include",
    });

    if (response.ok) {
      console.log("Home successfully created");
      navigate("/");
    } else {
      console.log("Error creating home");
    }
  };

  return (
    <div className="Home">
      <h2>Add Home</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Street:
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <label>
          State:
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </label>
        <label>
          Zipcode:
          <input
            type="text"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
          />
        </label>
        <label>
          Square Footage:
          <input
            type="number"
            value={squareFootage}
            onChange={(e) => setSquareFootage(Number(e.target.value))}
          />
        </label>
        <label>
          Year Built:
          <input
            type="number"
            value={yearBuilt}
            onChange={(e) => setYearBuilt(Number(e.target.value))}
          />
        </label>
        <label>
          Number of Bathrooms:
          <input
            type="number"
            value={numberBathrooms}
            onChange={(e) => setNumberBathrooms(Number(e.target.value))}
          />
        </label>
        <label>
          Number of Bedrooms:
          <input
            type="number"
            value={numberBedrooms}
            onChange={(e) => setNumberBedrooms(Number(e.target.value))}
          />
        </label>
        <input type="submit" value="Add Home" />
      </form>
    </div>
  );
}

export default Home;
