



const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14
    const courseArray= [
        {"partName": part1, qty: exercises1},
        {"partName": part2, qty: exercises2},
        {"partName":part3, qty: exercises3}
        ];
    console.log("Starting...");
    console.log(`Element 0 is ${courseArray[0].partName}`)
    return (
        <>
        <Header course={course}/>
        <Content courseArray={courseArray}/>
            <Total courseArray={courseArray} />
                </>
    );
}

const Content = (props) => {
    return (
        <div>
            <Part name={props.courseArray[0].partName} quantity={props.courseArray[0].qty}/>
            <Part name={props.courseArray[1].partName} quantity={props.courseArray[1].qty}/>
            <Part name={props.courseArray[2].partName} quantity={props.courseArray[2].qty}/>
        </div>
    );

}

const Part = (props) => {
    return (
        <p>Course "{props.name}" has {props.quantity} exercises.</p>
    )
}

const Header = (props) => {
    return (
        <h2>{props.course}</h2>
    )
}

const Total = (props) => {
    let finalTotal = 0;
    let local_size = props.courseArray.length;
    for (let i = 0 ; i < local_size ; i++){
        finalTotal += props.courseArray[i].qty;
    }
    return (
        <p>The total amount of course exercises is equal to : {finalTotal}</p>
    )
}









export default App