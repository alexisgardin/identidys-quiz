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
  chosenResponse?: number;
  comment?: string;
  linkTo?: number;
}
export interface Subject {
  name: string;
  image: any;
  ranking: number[];
  score: number;
  questions: QuestionModel[];
  disable: boolean;
}

export interface Quiz {
  subjects: Subject[];
}
