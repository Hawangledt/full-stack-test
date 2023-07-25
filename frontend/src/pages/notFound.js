import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <main>
      <h1> 404 Not Found!</h1>
      <Link to={-1}>Return to previous page</Link>
    </main>
  );
}

export { NotFound };
