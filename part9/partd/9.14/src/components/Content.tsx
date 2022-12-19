import coursePart from "../types/coursePart";
interface coursePartsProps {
  courseList: coursePart[];
}
const Content = (props: coursePartsProps): JSX.Element => {
  return (
    <>
      {props.courseList.map((c) => {
        return (
          <>
            <p>
              {c.name} has {c.exerciseCount} exercises.
            </p>
          </>
        );
      })}
    </>
  );
};
export default Content;
