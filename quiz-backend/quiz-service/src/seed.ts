import mongoose from "mongoose";

import { Quiz } from "./models/quizSchema";
import { Seed } from "./models/seedSchema";

//Default quizzes
const quizzes = [
  {
    quizTitle: "World Capitals",
    questions: [
      {
        question: "What is the capital of France?",
        options: ["Berlin", "Paris", "Madrid"],
        answer: "Paris",
      },
      {
        question: "What is the capital of Japan?",
        options: ["Tokyo", "Kyoto", "Osaka"],
        answer: "Tokyo",
      },
      {
        question: "What is the capital of Canada?",
        options: ["Toronto", "Ottawa", "Montreal"],
        answer: "Ottawa",
      },
      {
        question: "What is the capital of Sweden?",
        options: ["Göteborg", "Malmö", "Stockholm"],
        answer: "Stockholm",
      },
    ],
  },
  {
    quizTitle: "General Knowledge",
    questions: [
      {
        question: "Who wrote 'Hamlet'?",
        options: ["Shakespeare", "Tolstoy", "Hemingway", "Dante"],
        answer: "Shakespeare",
      },
      {
        question: "What is the chemical symbol for Gold?",
        options: ["Au", "Ag", "Gd"],
        answer: "Au",
      },
      {
        question: "How many continents are there?",
        options: ["5", "7", "8"],
        answer: "7",
      },
      {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Jupiter", "Saturn"],
        answer: "Jupiter",
      },
      {
        question: "Who painted the Mona Lisa?",
        options: ["Leonardo da Vinci", "Michelangelo", "Raphael"],
        answer: "Leonardo da Vinci",
      },
      {
        question: "What is the boiling point of water at sea level?",
        options: ["90°C", "100°C", "110°C"],
        answer: "100°C",
      },
      {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Oxygen", "Gold", "Osmium"],
        answer: "Oxygen",
      },
    ],
  },
];

//Class seeding the Mongodb with two default quizzes, also ensure that it only happens ONCE by checking if seed document exist
export default class SeedQuizDefault {
  private isSeeded: Boolean = false;

  constructor() {
    this.seed()
      .then(() => console.log("Done checking seeded"))
      .catch(() => console.log("Could not check if db was seeded"));
  }

  private async seed(): Promise<void> {
    try {
      const result = await Seed.countDocuments();
      console.log(result);
      if (result > 0) {
        this.isSeeded = true;
      }
      else {
        await this.insertToDb()
        this.isSeeded = true;
      }

    } catch (error) {
      console.error("Could not check if database was seeded");
    }
  }

  private async insertToDb(): Promise<void> {
    try {
      await Quiz.insertMany(quizzes);
      const seed = new Seed({
        seed: true,
      });
      await seed.save();
      console.log("Default quizzes has been seeded");
    } catch (error) {
      console.error("Could not seed database");
    }
  }
}
