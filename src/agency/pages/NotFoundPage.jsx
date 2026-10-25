import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import BlurHeading from '../components/BlurHeading';
import { usePageMeta } from '../usePageMeta';

const NotFoundPage = () => {
  usePageMeta({
    title: 'Page not found | Sajid',
    description: 'This page is not part of the Sajid site.',
    path: '/404',
  });

  return (
    <Layout>
      <header className="wrap page-hero">
        <p className="kicker">404</p>
        <BlurHeading as="h1" className="page-title" text="That page is not on this site." />
        <div className="actions">
          <Link className="btn btn-solid" to="/">
            Back home
          </Link>
          <Link className="btn btn-ghost" to="/work">
            View the work
          </Link>
        </div>
      </header>
    </Layout>
  );
};

export default NotFoundPage;
