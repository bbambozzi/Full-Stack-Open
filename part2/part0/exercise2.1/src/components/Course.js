
let Course = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ];
  return <Courses courses={courses} />;
};


// return <Course course={course} />


/*
 
  Plan : Map the components inside a Header element and a Note sub-element.
       
*/

let Courses = ({ courses }) => {
  return (
    <ul>
      {courses.map(course => {
        return <li key={course.id}><Header name={course.name} id={course.id} parts={course.parts} /></li>;
      })}

    </ul>
  );
};


let Header = ({ name, id, parts }) => {

  let betterCount = parts.reduce((prev, cur) => { return (prev + cur.exercises) }, 0)
  return (
    <>
      <h1>{name}</h1>
      <ul>
        {parts.map(part => {
          return <li key={part.id}><Part id={part.id} name={part.name} exercises={part.exercises} /></li>;
        })}
      </ul>
      <p>Total Exercises = {betterCount}</p>
    </>
  )

}

let Part = ({ name, exercises, id }) => {
  return <span>{name} has {exercises} exercises.</span>

}

export default Course;
