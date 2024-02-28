import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  //variable(getter) "toys" | setter "setToys"
  const [toys, setToys] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((res) => res.json())
      .then((data) => setToys(data));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  const filteredList = toys.filter((toy) =>
    toy.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header search={search} setSearch={setSearch} />
      {showForm ? <ToyForm toys={toys} setToys={setToys} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      {/* passing toys state as prop */}
      <ToyContainer toys={filteredList} setToys={setToys} />
      {/* toys={filteredList} passed to the components we are searching and responding with the filtered list. */}
    </>
  );
}

export default App;
