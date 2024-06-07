import { Fragment } from "react/jsx-runtime";
import { ITeacher, IQuestion, IStudent } from "../types";
import { api } from "../utils/api";

interface IProps {
  teacher: ITeacher;
  questions: IQuestion[];
  activeStudent: IStudent | undefined;
}

function TeacherReview({ teacher, questions, activeStudent }: IProps) {
  return (
    <Fragment key={teacher.id}>
      <table>
        <thead>
          <tr>
            <th colSpan={2}>{teacher.name}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <table>
                <thead>
                  <tr>
                    <th>Question</th>
                    <th>Choices</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((question) => {
                    const rate = false;
                    // ratings &&
                    // ratings.find(
                    //   (r) =>
                    //     r.question_id === question.id &&
                    //     r.teacher_id === teacher.id
                    // );

                    return (
                      <tr key={question.id}>
                        <td>{question.question}</td>
                        <td>
                          <select
                            disabled={!!rate}
                            onChange={async (e) => {
                              console.log(e.target.value);

                              const response = await api.put("/rate", {
                                student_id: activeStudent?.student_id,
                                teacher_id: teacher.id,
                                question_id: question.id,
                                grade: parseInt(e.target.value),
                              });

                              // if (response.status === 200) {
                              //   setRatings((oldRatings) => [
                              //     ...oldRatings,
                              //     {
                              //       student_id: activeStudent?.id,
                              //       teacher_id: teacher.id,
                              //       question_id: question.id,
                              //       grade: parseInt(e.target.value),
                              //     },
                              //   ]);
                              // }
                            }}
                          >
                            <option
                              selected={rate === undefined || rate === false}
                              value={-1}
                            >
                              Select...
                            </option>
                            {question.choices.map((choice, index) => (
                              <option
                                selected={rate === false}
                                value={index}
                                key={index}
                              >
                                {choice}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <br />
    </Fragment>
  );
}

export default TeacherReview;
