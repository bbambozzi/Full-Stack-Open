import coursePart from "../types/coursePart";
interface coursePartsProps {
  courseList: coursePart[];
}
const Content = (props: coursePartsProps): JSX.Element => {
  return (
    <>
      {props.courseList.map((c) => {
        switch (c.type) {
          case "normal":
            return (
              <>
                <strong>{c.name}</strong>
                <p>
                  <em>{c.description}</em>
                </p>
              </>
            );

          case "groupProject":
            return (
              <>
                <strong>{c.name}</strong>
                <p>exercise number {c.groupProjectCount}</p>
              </>
            );
          case "submission":
            return (
              <>
                <strong>{c.description}</strong>
                <p>{c.description}</p>
                <p>submitted at: {c.exerciseSubmissionLink}</p>
              </>
            );
          default:
            return <h4>This will never evaluate</h4>;
        }
      })}
    </>
  );
};
export default Content;
