import { useState } from "react";
import "./App.css";
import { AllComments } from "./Component/Section-AllComment/allComments";
import data from "./data.json";
function App() {
  return <AllComments data={data} />;
}

export default App;
