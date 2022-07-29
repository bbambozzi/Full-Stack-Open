
const App = () => {
    const a = 10;
    const b = 20;
    let personA = "Richard";
    let personB = "Sneed";
    return (
        <div>
            <p>{a} plus {b} is equal to {a + b}</p>
            <HelloPerson name={personA}/>
            <ShillGithub />
        </div>
    )
}
const HelloPerson = (props) => {
    return (
        <div>
            <p>Hello, {props.name}!</p>
        </div>
    )
}

const ShillGithub = () => {
    return (
      <div>
          <p>
          greeting shit created by <a href="https://www.google.com">chuck</a>
          </p>
      </div>
    )
};









export default App