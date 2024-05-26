import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../utils/api";
import { IQuestion, IRating, IStudent, ITeacher } from "../types";

function Student() {
  const [student, setStudent] = useState<IStudent>();
  const [studentOptions, setStudentOptions] = useState<IStudent[]>([]);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  const [ratings, setRatings] = useState<IRating[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/students").then((response) => {
      console.log("Students");
      console.log(response.data);
      setStudentOptions(response.data);
      setLoading(false);
    });
  }, []);

  const onSelectStudent = (newStudent: IStudent | undefined) => {
    api.get(`/questions/${newStudent?.student_id}`).then((response) => {
      console.log("Questions");
      console.log(response.data);
      setQuestions(response.data);
    });

    api.get(`/assigned/${newStudent?.student_id}`).then((response) => {
      console.log("Assigned");
      console.log(response.data);
      setTeachers(response.data);
    });

    api.get(`/ratings/${newStudent?.student_id}`).then((response) => {
      console.log("Rating");
      console.log(response.data);
      setRatings(response.data);
    });

    setStudent(newStudent);
  };

  return (
    <>
      <Link to="/">Back</Link>
      <h1>Student Panel</h1>
      <br />
      <h2>
        Student:{" "}
        {student
          ? `${student?.first_name} ${student?.last_name} (ID: ${student?.student_id})`
          : ""}
      </h2>
      <select
        disabled={loading}
        value={student?.student_id}
        onChange={(e) =>
          onSelectStudent(
            studentOptions.find((s) => String(s.student_id) === e.target.value)
          )
        }
      >
        {studentOptions.map((student) => {
          return (
            <option
              key={student.student_id}
              value={student.student_id}
              id={String(student.student_id)}
            >
              {student.first_name} {student.last_name}
            </option>
          );
        })}
      </select>
      <br />

      <h2>Grading</h2>
      {!teachers || teachers.length === 0 ? (
        <p>You do not have any pending ratings...</p>
      ) : (
        teachers.map((teacher) => {
          return (
            <>
              <table>
                <tr>
                  <th>Teacher Name</th>
                </tr>
                <tr>
                  {teacher.first_name} {teacher.last_name}
                </tr>

                <tr>
                  <td>
                    <table>
                      <tr>
                        <th>Question</th>
                        <th>Choices</th>
                      </tr>
                      {questions.map((question) => {
                        const rate =
                          ratings &&
                          ratings.find(
                            (r) =>
                              r.question_id === question.id &&
                              r.teacher_id === teacher.id
                          );

                        return (
                          <tr>
                            <td>{question.question}</td>
                            <td>
                              <select
                                disabled={!!rate}
                                onChange={async (e) => {
                                  console.log(e.target.value);

                                  await api.put("/rate", {
                                    student_id: student?.student_id,
                                    teacher_id: teacher.id,
                                    question_id: question.id,
                                    grade: parseInt(e.target.value),
                                  });
                                }}
                              >
                                <option
                                  selected={
                                    rate === undefined || rate.grade === -1
                                  }
                                  value={-1}
                                >
                                  Select...
                                </option>
                                {question.choices.map((choice, index) => {
                                  return (
                                    <option
                                      selected={rate?.grade === index}
                                      value={index}
                                      key={index}
                                    >
                                      {choice}
                                    </option>
                                  );
                                })}
                              </select>
                            </td>
                          </tr>
                        );
                      })}
                    </table>
                  </td>
                </tr>
              </table>
              <br />
            </>
          );
        })
      )}
    </>
  );
}

export default Student;
