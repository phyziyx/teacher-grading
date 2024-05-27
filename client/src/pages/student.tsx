import { useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import {
  getQuestions,
  getStudents,
  getTeachers,
  setActiveStudent,
} from "../redux/slices";
import { AppDispatch, RootState } from "../redux/store";
import { IStudent } from "../types";

function Student() {
  const { loading, students, questions, activeStudent, teachers, error } =
    useSelector((state: RootState) => state.grading);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getQuestions());
    dispatch(getTeachers());
  }, [activeStudent, dispatch]);

  const onSelectStudent = (newStudent: IStudent | undefined) => {
    dispatch(setActiveStudent(newStudent));
  };

  return (
    <>
      <Link to="/">Back</Link>
      <h1>Student Panel</h1>
      <br />
      <h2>
        Student:{" "}
        {activeStudent
          ? `${activeStudent?.name} (ID: ${activeStudent?.regno})`
          : ""}
      </h2>
      <select
        key={""}
        disabled={loading}
        value={activeStudent?.student_id}
        onChange={(e) =>
          onSelectStudent(
            students.find((s) => s.student_id === parseInt(e.target.value))
          )
        }
      >
        <option key={-1} value={-1} id={"-1"}>
          None
        </option>
        {students.map((student) => {
          return (
            <option key={student.student_id} value={student.student_id}>
              {student.name}
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
                <tr>{teacher.name}</tr>

                <tr>
                  <td>
                    <table>
                      <tr>
                        <th>Question</th>
                        <th>Choices</th>
                      </tr>
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
                                key={question.id}
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
                                  selected={
                                    rate === undefined || rate === false
                                  }
                                  value={-1}
                                  key={-1}
                                >
                                  Select...
                                </option>
                                {question.choices.map((choice, index) => {
                                  return (
                                    <option
                                      selected={rate === false}
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
      <pre>{error}</pre>
    </>
  );
}

export default Student;
