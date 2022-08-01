



const App = () => {


    const myCourse = {"name": "Half stack application development",
        "parts":[
            {"partName":'Fundamentals of React', "qty": 10},
            {"partName": 'Using props to pass data',  "qty": 7},
            {"partName":'State of a component', "qty": 14}
        ]};
    return (
        <>
        <Header course={myCourse}/>
        <Content course={myCourse}/>
            <Total course={myCourse}/>
                </>
    );
}

const Content = (props) => {
    return (
        <div>
            <Part name={props.course.parts[0].partName} quantity={props.course.parts[0].qty}/>
            <Part name={props.course.parts[1].partName} quantity={props.course.parts[1].qty}/>
            <Part name={props.course.parts[2].partName} quantity={props.course.parts[2].qty}/>
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
        <h2>{props.course.name}</h2>
    )
}

const Total = (props) => {
    let length_of_course = props.course.parts.length;
    let total = 0;
    for (let i = 0 ; i < length_of_course ; i++){
        total += (props.course.parts[i].qty);
    }
    return (
        <p>This course has {total} exercises.</p>
    )
}
export default App