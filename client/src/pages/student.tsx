import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getQuestions,
  getStudents,
  getTeachers,
  setActiveStudent,
} from "../redux/slices";
import { AppDispatch, RootState } from "../redux/store";
import { IStudent } from "../types";
import TeacherReview from "../components/TeacherReview";

function Student() {
  const { loading, students, questions, activeStudent, teachers, error } =
    useSelector((state: RootState) => state.grading);
  const dispatch = useDispatch<AppDispatch>();

  const [pending, setPending] = useState(false);

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  useEffect(() => {
    if (!activeStudent) return;
    dispatch(getQuestions());
    dispatch(getTeachers());
    setPending(false);
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
      <br />

      <h2>Grading</h2>
      {!teachers || teachers.length === 0 ? (
        <p>You do not have any pending ratings...</p>
      ) : (
        teachers.map((teacher) => {
          return (
            <TeacherReview
              key={teacher.id}
              teacher={teacher}
              activeStudent={activeStudent}
              questions={questions}
            />
          );
        })
      )}
      <pre>{error}</pre>
    </>
  );
}

export default Student;
