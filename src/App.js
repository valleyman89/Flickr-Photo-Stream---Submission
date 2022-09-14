import React from "react";
import Navigation from "./components/Navigation";
import SafeMode from "./components/SafeMode";
import Search from "./components/Search";
import LoadMoreTrigger from "./components/LoadMoreTrigger";
import Pictures from "./components/Pictures";

function App() {
  return (
    <>
      <SafeMode />
      <div className="container margin">
        <Navigation />
        <Search />
        <Pictures />
        <LoadMoreTrigger />
      </div>
    </>
  );
}

export default App;
