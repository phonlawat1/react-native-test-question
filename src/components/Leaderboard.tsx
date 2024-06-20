import React from "react";
import { useNavigate } from "react-router-dom";

interface LeaderBoardScore {
  scoreSubmit: number;
}

function Leaderboard({ scoreSubmit }: LeaderBoardScore) {
  const navigate = useNavigate();
  const backQize = () => {
    navigate(-1);
  };
  console.log(scoreSubmit);

  return (
    <div>
      <div className="bg-gray-100 min-h-screen py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">LeaderBoard</h1>
          <div className="flex justify-center">
            <h1 className="text-2xl font-bold text-center mb-8">
              คะแนนที่ทำได้:
            </h1>
            <h1 className="text-3xl font-bold text-green-500 text-center mb-8 ml-5">
              {scoreSubmit}
            </h1>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="p-2 rounded-lg cursor-pointer bg-blue-400 hover:bg-blue-300 active:bg-blue-500"
            onClick={backQize}
          >
            ทดสอบอีกครั้ง
          </button>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
