import { useEffect, useState } from "react";
import { ALL_AUTHORS, ALL_BOOKS } from "../graphql/queries";
import { EDIT_AUTHOR } from "../graphql/mutations";
import { useQuery, useMutation } from "@apollo/client";

const Authors = (props) => {
  const authorsQueryResult = useQuery(ALL_AUTHORS);
  const [changeYearTo, setChangeYearTo] = useState("");
  const [authorToChange, setAuthorToChange] = useState("");
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
  });
  if (!props.show || authorsQueryResult.loading) {
    return null;
  }
  const authors = authorsQueryResult.data.allAuthors;

  const handleEditYear = (e) => {
    e.preventDefault();
    editAuthor({
      variables: { name: authorToChange, year: parseInt(changeYearTo) },
    });
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <>
        <h4>Edit birth year</h4>
        <select onChange={(e) => setAuthorToChange(e.target.value)}>
          <option key={0}>Select an Author</option>
          {authors.map((a) => {
            return (
              <option value={a.name} key={a.name}>
                {a.name}
              </option>
            );
          })}
        </select>
        <form>
          <input
            type="text"
            value={changeYearTo}
            onChange={(e) => {
              setChangeYearTo(e.target.value);
            }}
          ></input>
          <button onClick={handleEditYear} type="submit">
            Edit year
          </button>
        </form>
      </>
    </div>
  );
};

export default Authors;
