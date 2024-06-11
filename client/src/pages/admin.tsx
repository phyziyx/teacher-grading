import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  getTeacherClasses,
  getTeachers,
  getQuestions,
  setActiveTeacher,
  getTeacherReviewsByClass,
} from "../redux/slices/admin";
import Survey from "../components/Survey";

function Admin() {
  const { reviews, classes, activeTeacher, questions, teachers } = useSelector(
    (state: RootState) => state.admin
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getTeachers());
  }, [dispatch]);

  const onSelectTeacher = (teacherId: string) => {
    const selectedTeacher = teachers.find(
      (teacher) => teacher.id === Number(teacherId)
    );

    dispatch(setActiveTeacher(selectedTeacher));
    selectedTeacher && dispatch(getTeacherClasses(selectedTeacher.id));
  };

  const onSelectClass = (classId: string) => {
    dispatch(getQuestions());
    dispatch(
      getTeacherReviewsByClass({
        teacherId: activeTeacher?.id as number,
        classId: Number(classId),
      })
    );
  };

  return (
    <>
      <Link to="/">Back</Link>
      <h1>Admin Panel</h1>
      <br />

      <h2>Teachers</h2>
      <select onChange={(e) => onSelectTeacher(e.target.value)}>
        <option key={-1} value={-1}>
          Select...
        </option>
        {teachers.map((teacher) => (
          <option key={teacher.id} value={teacher.id}>
            {teacher.name}
          </option>
        ))}
      </select>

      <br />

      {activeTeacher ? (
        <>
          <select onChange={(e) => onSelectClass(e.target.value)}>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                ({c.id}) {c.semester} {c.section}
              </option>
            ))}
          </select>

          {reviews && (
            <Survey
              reviews={reviews}
              questions={questions}
              teacher={activeTeacher}
            />
          )}
        </>
      ) : (
        <em>Select a teacher to view their reviews...</em>
      )}
    </>
  );
}

export default Admin;
