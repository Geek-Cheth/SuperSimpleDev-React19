import { Link } from 'react-router';
import './NotFoundPage.css';

export function NotFoundPage() {
  return (
    <main className="not-found-page">
      <section className="not-found-card" aria-labelledby="not-found-title">
        <p className="not-found-code">404</p>
        <h1 id="not-found-title">Page not found</h1>
        <p className="not-found-message">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link className="not-found-home-link" to="/">
          Go back home
        </Link>
      </section>
    </main>
  );
}
