import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { ME } from "../graphql/queries";
import useFilteredBooks from "../hooks/useFilteredBooks";

const Recommended = () => {
  const [books, setFilter] = useFilteredBooks("");
  const meQuery = useQuery(ME);

  useEffect(() => {
    console.log(meQuery);
    if (meQuery?.data?.me?.favoriteGenre !== undefined) {
      setFilter(meQuery.data.me.favoriteGenre);
      console.log(books);
    }
  }, [meQuery]);

  if (meQuery.loading === false && books !== null) {
    return (
      <>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>

            {books.length !== null && books.length > 0
              ? books.map((a) => (
                  <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </>
    );
  } else {
    return <h4>loading..</h4>;
  }
};

export default Recommended;
