import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTeacherReview,
  getStudentList,
  setActiveStudent,
  getQuestions,
} from "../redux/slices/student";
import { AppDispatch, RootState } from "../redux/store";
import { IStudent } from "../types";
import TeacherReview from "../components/TeacherReview";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Student() {
  const { ratings, questions, students, activeStudent } = useSelector(
    (state: RootState) => state.student
  );
  const dispatch = useDispatch<AppDispatch>();

  const [pending, setPending] = useState(false);

  useEffect(() => {
    dispatch(getStudentList());
    dispatch(getQuestions());
  }, [dispatch]);

  useEffect(() => {
    if (!activeStudent) return;
    dispatch(getTeacherReview(activeStudent?.student_id));
    setPending(false);
  }, [activeStudent, dispatch]);

  const onSelectStudent = (newStudent: IStudent | undefined) => {
    dispatch(setActiveStudent(newStudent));
  };

  return (
    <section className="section">
      <Navbar />

      <div className="container has-text-centered">
        <h1 className="title">Student Panel</h1>
        <hr className="navbar-divider" />
        <div className="select">
          <select
            key={""}
            disabled={pending}
            value={activeStudent?.student_id}
            onChange={(e) => {
              setPending(true);
              onSelectStudent(
                students.find((s) => s.student_id === parseInt(e.target.value))
              );
            }}
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
        </div>
        <hr />

        {pending ? (
          "Loading..."
        ) : (
          <>
            <h2 className="title">Grading</h2>
            {!ratings || ratings.length === 0 ? (
              <p>You do not have any pending ratings...</p>
            ) : (
              ratings.map(({ id, name, ratings }) => {
                return (
                  <TeacherReview
                    key={`${activeStudent?.regno}_${id}`}
                    teacher={{ id, name }}
                    activeStudent={activeStudent}
                    questions={questions}
                    ratings={ratings}
                  />
                );
              })
            )}
          </>
        )}
      </div>

      <Footer />
    </section>
  );
}

export default Student;
