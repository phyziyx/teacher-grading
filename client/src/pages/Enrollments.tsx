import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import {
  assignStudentClass,
  getStudentList,
  getTeacherClasses,
} from "../redux/slices/admin";
import api from "../utils/api";
import { IClass } from "../types";

interface INotification {
  message: string;
  type: "danger" | "success";
}

function Enrollments() {
  const { students, classes } = useSelector((state: RootState) => state.admin);
  const dispatch = useDispatch<AppDispatch>();
  const [notification, setNotification] = useState<INotification | null>(null);

  useEffect(() => {
    dispatch(getTeacherClasses());
    dispatch(getStudentList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeStudentClass = (studentId: number, classId: number) => {
    api
      .put(`/enrollments/`, {
        student_id: studentId,
        class_id: classId,
      })
      .then(() => {
        setNotification({
          message: "Student class updated successfully",
          type: "success",
        });

        const foundClass = classes.find((c) => c.id === classId) as IClass;
        dispatch(
          assignStudentClass({
            studentId,
            classData: foundClass,
          })
        );
      })
      .catch(() => {
        setNotification({
          message: "Failed to update student class",
          type: "danger",
        });
      });
  };

  return (
    <section className="section">
      <Navbar />
      <div className="container has-text-centered">
        {notification && (
          <div className={`notification is-${notification.type} is-light`}>
            <button
              className="delete"
              onClick={() => {
                setNotification(null);
              }}
            ></button>
            {notification.message}
          </div>
        )}
        <div className="container column has-text-centered">
          <h1 className="title">Enrollments Panel</h1>
          <hr />
          <h2 className="title">Students</h2>
          <table className="table is-bordered is-striped is-fullwidth mx-auto">
            <thead>
              <th>ID</th>
              <th>Reg. No</th>
              <th>Student Name</th>
              <th>Assigned Class</th>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.student_id}>
                  <td>{student.student_id}</td>
                  <td>{student.regno}</td>
                  <td>{student.name}</td>
                  <td>
                    <div className="select">
                      <select
                        key={student.regno}
                        name="class_id"
                        value={student.enrollment?.id || 0}
                        onChange={(e) =>
                          onChangeStudentClass(
                            student.student_id,
                            Number(e.target.value)
                          )
                        }
                      >
                        <option key={0} value={0}>
                          Select...
                        </option>
                        {classes.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.semester} {c.section}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default Enrollments;
