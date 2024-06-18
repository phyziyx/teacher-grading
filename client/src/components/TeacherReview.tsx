import { ITeacher, IQuestion, IStudent, IRating } from "../types";
import api from "../utils/api";

interface IProps {
  teacher: ITeacher;
  questions: IQuestion[];
  activeStudent: IStudent | undefined;
  ratings: IRating[];
}

function TeacherReview({ teacher, questions, activeStudent, ratings }: IProps) {
  return (
    <table className="table is-striped mx-auto">
      <thead>
        <tr>
          <th className="subtitle is-justify-content-right	" colSpan={2}>
            {teacher.name}
            {/* <button className="button is-light is-danger">Clear</button> */}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <table className="table is-bordered is-striped">
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Choices</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question) => {
                  const rate =
                    ratings &&
                    ratings.find((r) => r.question_id === question.id);

                  return (
                    <tr key={question.id}>
                      <td>{question.question}</td>
                      <td>
                        {rate ? (
                          question.choices[rate.grade]
                        ) : (
                          <div className="select">
                            <select
                              onChange={async (e) => {
                                await api.put("/rate", {
                                  student_id: activeStudent?.student_id,
                                  teacher_id: teacher.id,
                                  question_id: question.id,
                                  grade: parseInt(e.target.value),
                                });
                              }}
                            >
                              <option value={-1}>Select...</option>
                              {question.choices.map((choice, index) => (
                                <option value={index} key={index}>
                                  {choice}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
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
  );
}

export default TeacherReview;
