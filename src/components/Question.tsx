import React, { useState, useEffect, FC } from "react";
import { useNavigate } from "react-router-dom";

interface Score {
  onValueScore: (showScore: number) => void;
}

interface QuestionType {
  id: number;
  question: string;
  answers: string[];
  correctAnswer: string;
}

const questions: QuestionType[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    answers: ["Paris", "Berlin", "London", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    id: 2,
    question: "Who wrote 'Romeo and Juliet'?",
    answers: [
      "William Shakespeare",
      "Charles Dickens",
      "Jane Austen",
      "Leo Tolstoy",
    ],
    correctAnswer: "William Shakespeare",
  },
  {
    id: 3,
    question: "Which planet is known as the Red Planet?",
    answers: ["Mars", "Venus", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
  },
  {
    id: 4,
    question: "What is the largest mammal in the world?",
    answers: ["Blue Whale", "Elephant", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale",
  },
  {
    id: 5,
    question: "Who painted the Mona Lisa?",
    answers: [
      "Leonardo da Vinci",
      "Vincent van Gogh",
      "Pablo Picasso",
      "Michelangelo",
    ],
    correctAnswer: "Leonardo da Vinci",
  },
  {
    id: 6,
    question: "What is the tallest mountain in the world?",
    answers: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
    correctAnswer: "Mount Everest",
  },
  {
    id: 7,
    question: "Which country is known as the Land of the Rising Sun?",
    answers: ["Japan", "China", "Korea", "Vietnam"],
    correctAnswer: "Japan",
  },
  {
    id: 8,
    question: "What is the chemical symbol for water?",
    answers: ["H2O", "CO2", "O2", "H2SO4"],
    correctAnswer: "H2O",
  },
  {
    id: 9,
    question: "Who discovered penicillin?",
    answers: [
      "Alexander Fleming",
      "Marie Curie",
      "Isaac Newton",
      "Albert Einstein",
    ],
    correctAnswer: "Alexander Fleming",
  },
  {
    id: 10,
    question: "What year did the Titanic sink?",
    answers: ["1912", "1905", "1923", "1931"],
    correctAnswer: "1912",
  },
  {
    id: 11,
    question: "Which bird is known for its ability to mimic human speech?",
    answers: ["Parrot", "Penguin", "Eagle", "Ostrich"],
    correctAnswer: "Parrot",
  },
  {
    id: 12,
    question: "Who wrote 'Harry Potter'?",
    answers: [
      "J.K. Rowling",
      "George R.R. Martin",
      "Stephen King",
      "J.R.R. Tolkien",
    ],
    correctAnswer: "J.K. Rowling",
  },
  {
    id: 13,
    question: "What is the smallest planet in our solar system?",
    answers: ["Mercury", "Mars", "Venus", "Earth"],
    correctAnswer: "Mercury",
  },
  {
    id: 14,
    question: "Which musical instrument has black and white keys?",
    answers: ["Piano", "Violin", "Guitar", "Drums"],
    correctAnswer: "Piano",
  },
  {
    id: 15,
    question: "Who was the first man to walk on the moon?",
    answers: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Alan Shepard"],
    correctAnswer: "Neil Armstrong",
  },
  {
    id: 16,
    question: "What is the largest organ in the human body?",
    answers: ["Skin", "Liver", "Heart", "Brain"],
    correctAnswer: "Skin",
  },
  {
    id: 17,
    question: "Who wrote 'The Great Gatsby'?",
    answers: [
      "F. Scott Fitzgerald",
      "Ernest Hemingway",
      "Mark Twain",
      "Charles Dickens",
    ],
    correctAnswer: "F. Scott Fitzgerald",
  },
  {
    id: 18,
    question: "Which sport is known as the 'king of sports'?",
    answers: ["Football (Soccer)", "Basketball", "Cricket", "Tennis"],
    correctAnswer: "Football (Soccer)",
  },
  {
    id: 19,
    question: "What is the longest river in the world?",
    answers: [
      "Nile River",
      "Amazon River",
      "Yangtze River",
      "Mississippi River",
    ],
    correctAnswer: "Nile River",
  },
  {
    id: 20,
    question: "Which country is famous for its tulips?",
    answers: ["Netherlands", "Italy", "France", "Germany"],
    correctAnswer: "Netherlands",
  },
];

const Question: React.FC<Score> = ({ onValueScore }) => {
  const navigate = useNavigate();
  const [randomQuestions, setRandomQuestions] = useState<QuestionType[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});
  const [correct, setCorrect] = useState<boolean | null>(true);
  const [originalQuestions, setOriginalQuestions] = useState<QuestionType[]>(
    []
  );
  useEffect(() => {
    setOriginalQuestions(questions);
    const shuffledQuestions = questions
      .sort(() => 0.5 - Math.random())
      .slice(0, 20);
    const shuffledAnswers = shuffledQuestions.map((q) => ({
      ...q,
      answers: q.answers.sort(() => 0.5 - Math.random()),
    }));
    setRandomQuestions(shuffledAnswers);
  }, []);

  const collectAnswer = (questionId: number, answer: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const submit = () => {
    let scoreSum: number = 0;
    let dataCompa: any = originalQuestions.sort((a, b) =>
      a.id > b.id ? 1 : -1
    );
    const isAllCorrect: boolean =
      randomQuestions.length === Object.keys(selectedAnswers).length;

    if (isAllCorrect) {
      let dataAnswer = [selectedAnswers];

      dataCompa.forEach((element: any) => {
        const qId = element.id;
        const userAnswer = selectedAnswers[qId];
        if (userAnswer === element.correctAnswer) {
          scoreSum++;
        }
      });
      onValueScore(scoreSum);
      navigate("/leaderboard");
    } else {
      alert("กรุณาตอบให้ครบทุกข้อ");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Quiz Application
        </h1>
        {randomQuestions.map((q, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 mb-4">
            <h3 className="text-xl font-semibold mb-4">{q.question}</h3>
            <ul>
              {q.answers.map((answer, idx) => (
                <li
                  key={idx}
                  className={`p-2 rounded-lg cursor-pointer hover:bg-blue-100 ${
                    selectedAnswers[q.id] === answer
                      ? "bg-blue-200"
                      : "bg-white"
                  }`}
                  onClick={() => collectAnswer(q.id, answer)}
                >
                  {answer}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="text-center">
          <button
            className="p-2 rounded-lg cursor-pointer bg-blue-400 hover:bg-blue-300 active:bg-blue-500"
            onClick={submit}
          >
            ส่งคำตอบ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question;
