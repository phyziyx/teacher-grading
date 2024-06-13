import { IQuestion, ITeacher, ITeacherRating } from "../types";
import Question from "./Question";

interface IProps {
  questions: IQuestion[];
  teacher: ITeacher;
  reviews: ITeacherRating[];
}

function Survey({ questions, reviews }: IProps) {
  // const reviews = questionn.map((question) => {
  //     const teacherRatings = question.choices.map((choice, index) => {
  //       const choiceRating =
  //         ratings.filter(
  //           (r) => r.question_id === question.id && r.grade === index
  //         )?.length || 0;
  //       // console.log(question.id, choice, choiceRating);
  //       return [choice, choiceRating];
  //     });
  //     teacherRatings.push(["No Rating", 1]);
  // console.log(question.id, JSON.stringify(teacherRatings));

  reviews.map((r) => r.ratings);

  const mutatedReviews = [
    ["No Ratings", 1],
    ["Poor", 1],
  ];

  return questions.map((q) => (
    <Question key={q.id} question={q} reviews={mutatedReviews} />
  ));
}

export default Survey;
