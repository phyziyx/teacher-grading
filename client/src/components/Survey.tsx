import { IQuestion, ITeacher, ITeacherReview } from "../types";
import Question from "./Question";

interface IProps {
  questions: IQuestion[];
  teacher: ITeacher;
  reviews: ITeacherReview[];
}

function Survey({ questions, reviews }: IProps) {
  return questions.map((q) => {
    const foundReview = reviews.find((r) => r.id === q.id);

    const mutatedReviews = foundReview
      ? [
          ...foundReview.choices.map((c, choiceIdx) => {
            const reviewCount = foundReview.answers.filter(
              (a) => Number(a.grade) === choiceIdx
            ).length;
            return [`${c} (${reviewCount})`, reviewCount];
          }),
          [`No Ratings (${foundReview.unrated})`, foundReview.unrated],
        ]
      : [["No Ratings (1)", 1]];

    return <Question key={q.id} question={q} reviews={mutatedReviews} />;
  });
}

export default Survey;
