import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  getTeacherClasses,
  getTeachers,
  getQuestions,
  setActiveTeacher,
  setActiveClass,
  getTeacherReviewsByClass,
  resetActiveClass,
} from "../redux/slices/admin";
import Survey from "../components/Survey";

function Admin() {
  const { reviews, classes, activeTeacher, activeClass, questions, teachers } =
    useSelector((state: RootState) => state.admin);
  const dispatch = useDispatch<AppDispatch>();

  const updateReviews = useCallback(() => {
    dispatch(getQuestions());
    dispatch(
      getTeacherReviewsByClass({
        teacherId: activeTeacher?.id as number,
        classId: Number(activeClass?.id),
      })
    );
  }, [activeTeacher, activeClass, dispatch]);

  useEffect(() => {
    dispatch(getTeachers());
  }, [dispatch]);

  useEffect(() => {
    if (activeTeacher && activeClass) updateReviews();
  }, [activeClass, activeTeacher, updateReviews]);

  const onSelectTeacher = (teacherId: string) => {
    const selectedTeacher = teachers.find(
      (teacher) => teacher.id === Number(teacherId)
    );

    dispatch(setActiveTeacher(selectedTeacher));
    selectedTeacher && dispatch(getTeacherClasses(selectedTeacher.id));
    dispatch(resetActiveClass());
  };

  return (
    <section className="section">
      <div className="container has-text-centered">
        <nav>
          <Link to="/">Back</Link>
        </nav>
        <h1 className="title">Admin Panel</h1>
        <hr />
        <h2 className="title">Teachers</h2>
        <div className="select">
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
        </div>
        {activeTeacher ? (
          <>
            <hr />
            <h2 className="title">Classes</h2>
            <div className="buttons is-justify-content-center">
              {classes.map((c) => {
                return (
                  <div key={c.id}>
                    <button
                      className="button is-light is-primary"
                      onClick={() => dispatch(setActiveClass(c))}
                    >
                      ({c.id}) {c.semester} {c.section}
                    </button>
                  </div>
                );
              })}
            </div>
            <hr />

            {activeClass && (
              <>
                Viewing reviews for {activeTeacher.name} for{" "}
                {activeClass.semester} {activeClass.section}
                <button
                  className="button is-light is-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    updateReviews();
                  }}
                >
                  Refresh
                </button>
                <hr />
                <Survey
                  reviews={reviews}
                  questions={questions}
                  teacher={activeTeacher}
                />
              </>
            )}
          </>
        ) : (
          <em>
            <br />
            Select a teacher to view their reviews...
          </em>
        )}
      </div>
    </section>
  );
}

export default Admin;
