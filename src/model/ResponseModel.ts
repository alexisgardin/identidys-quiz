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
}
export interface Subject {
  id: number;
  name: string;
  image: any;
  ranking: number[];
  score: number;
  questions: QuestionModel[];
  disable: boolean;
  counterError: 0; //Certaine question ne sont pas valide si d'autre sont coché, ceci est un workaround
}

export interface Quiz {
  subjects: Subject[];
}
