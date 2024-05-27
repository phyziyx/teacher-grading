import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import { Link } from "react-router-dom";
import { api } from "../utils/api";
import { IQuestion, IRating, ITeacher } from "../types";

function Admin() {
  const [teacher, setTeacher] = useState<ITeacher>();
  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  const [ratings, setRatings] = useState<IRating[]>([]);
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  useEffect(() => {
    api.get("/teachers").then((response) => {
      console.log("Teachers");
      console.log(response.data);
      setTeachers(response.data);
    });

    api.get("/questions").then((response) => {
      console.log("Questions");
      console.log(response.data);
      setQuestions(response.data);
    });
  }, []);

  const onSelectTeacher = (teacherId: string) => {
    const selectedTeacher = teachers.find(
      (teacher) => teacher.id === Number(teacherId)
    );

    if (selectedTeacher) {
      api.get(`/ratings/teachers/${selectedTeacher?.id}`).then((response) => {
        console.log("Teacher Rating");
        console.log(response.data);
        setRatings(response.data);
      });

      setTeacher(selectedTeacher);
    }
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
            {teacher.first_name} {teacher.last_name} ({teacher.subject})
          </option>
        ))}
      </select>

      {teacher &&
        questions.map((question) => {
          const teacherRatings = question.choices.map((choice, index) => {
            const choiceRating =
              ratings.filter(
                (r) => r.question_id === question.id && r.grade === index
              )?.length || 0;

            // console.log(question.id, choice, choiceRating);

            return [choice, choiceRating];
          });

          teacherRatings.push(["No Rating", 1]);

          // console.log(question.id, JSON.stringify(teacherRatings));

          return (
            <div key={question.id}>
              <h3>{question.question}</h3>
              <Chart
                chartType="PieChart"
                data={[["Rating", "Count"], ...teacherRatings]}
                width="100%"
                height="400px"
                legendToggle
                options={{
                  sliceVisibilityThreshold: 0,
                }}
              />
            </div>
          );
        })}
    </>
  );
}

export default Admin;
