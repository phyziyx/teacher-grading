import Chart from "react-google-charts";
import { IQuestion, ITeacher } from "../types";

interface IProps {
  questions: IQuestion[];
  teacher: ITeacher;
}

function Question({
  question,
  reviews,
}: {
  question: IQuestion;
  reviews: unknown[];
}) {
  return (
    <div key={question.id}>
      <h3>{question.question}</h3>
      <Chart
        chartType="PieChart"
        data={[["Rating", "Count"], ...reviews]}
        width="100%"
        height="400px"
        legendToggle
        options={{
          sliceVisibilityThreshold: 0,
        }}
      />
    </div>
  );
}

function Survey({ questions }: IProps) {
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

  const ratings = [
    ["No Ratings", 1],
    ["Poor", 1],
  ];

  return questions.map((q) => <Question question={q} reviews={ratings} />);
}

export default Survey;
