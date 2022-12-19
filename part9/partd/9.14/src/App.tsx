import Header from "./components/Header";
import Content from "./components/Content";
import courseParts from "./data/courseContents";
import Total from "./components/Total";
const App = () => {
  return (
    <>
      <Header courseTitle="Half-Stack Application Development" />
      <Content courseList={courseParts} />
      <Total courseList={courseParts} />
    </>
  );
};
export default App;
