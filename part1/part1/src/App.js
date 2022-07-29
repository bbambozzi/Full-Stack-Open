function mySum(arr) {
    let totalSum = 0;
    for (let val of arr){
        totalSum += val;
    }
    return totalSum;
}




const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <>
        <Header />
        <Content partName={part1} partAmount={exercises1} />
            <Content partName={part2} partAmount={exercises2} />
            <Content partName={part3} partAmount={exercises3} />
        <Total sum={exercises1+exercises3+exercises2} />
        </>
    )
}


const Header = () => {
    return (
        <div>
            <h3>
                Half-Stack application development
            </h3>
        </div>

    );
}

const Content = (props) => {
    return (
        <div>
            <p>The content of '{props.partName}' has {props.partAmount} exercises</p>

        </div>
    );
}

const Total = (props) => {
    return (
        <p>The total sum of elements is {props.sum}</p>
    );
}

export default App