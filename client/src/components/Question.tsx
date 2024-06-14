import Chart from "react-google-charts";
import { ChartDataset, IQuestion } from "../types";

interface IProps {
  question: IQuestion;
  reviews: ChartDataset;
}

const Question = ({ question, reviews }: IProps) => (
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

export default Question;
