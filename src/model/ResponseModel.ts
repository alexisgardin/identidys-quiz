export interface ResponseModel {
  response: string;
  id: number;
  score: number;
}
export interface QuestionModel {
  id: number;
  score: number;
  question: string;
  responses: ResponseModel[];
  chosenResponse?: string;
  comment?: string;
}
export interface Subject {
  name: string;
  image: any;
  questions: QuestionModel[];
}

export interface Quiz {
  subjects: Subject[];
}
