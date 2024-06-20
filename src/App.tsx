import React, { useState, useEffect } from "react";
import Question from "./components/Question";
import Leaderboard from "./components/Leaderboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";

interface Score {
  onValueScore: (showScore: number) => void;
}

interface LeaderBoardScore {
  scoreSubmit: number;
}

const App: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const showScore = (showScore: number) => {
    setScore(showScore);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Question onValueScore={showScore} />}></Route>
        <Route
          path="/leaderboard"
          element={<Leaderboard scoreSubmit={score} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
