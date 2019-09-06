import React, { Component } from "react";
import "./App.css";
import StepSlider from "./components/StepSlider";
import styled from "styled-components";

class App extends Component {
  render() {
    const steps = [
      { label: "Weak", value: "0" },
      { label: "Normal", value: "1" },
      { label: "Strong", value: "2" },
      { label: "Very Strong", value: "3" }
    ];
    return (
      <div className="App">
        <AppContainer>
          <StepSlider steps={steps}></StepSlider>
        </AppContainer>
      </div>
    );
  }
}

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
  padding-right: 20px;
  height: 300px;
  width: 700px;
`;

export default App;
