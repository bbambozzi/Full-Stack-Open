import coursePart from "../types/coursePart";
const Total = ({ courseList }: { courseList: coursePart[] }) => {
  return (
    <>
      {
        <p>
          Total amount of exercises: {""}
          {courseList.reduce((acc: number, cur: coursePart) => {
            return acc + cur.exerciseCount;
          }, 0)}
        </p>
      }
    </>
  );
};

export default Total;
