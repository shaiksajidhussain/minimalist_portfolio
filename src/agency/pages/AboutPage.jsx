import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import BlurHeading from '../components/BlurHeading';
import { usePageMeta } from '../usePageMeta';

const AboutPage = () => {
  usePageMeta({
    title: 'About | Sajid',
    description: 'Sajid is an independent digital studio for websites, applications, and practical growth work.',
    path: '/about',
  });

  return (
    <Layout>
      <header className="wrap page-hero">
        <p className="kicker">About</p>
        <BlurHeading as="h1" className="page-title" text="A studio for products that have to earn their place." />
      </header>
      <section className="wrap split" style={{ paddingBottom: '5rem' }}>
        <div className="prose">
          <p>
            Sajid works with founders, startups, and growing companies that need a website, a
            web or mobile application, or a clearer commercial presence. The studio is independent.
            We do not publish a roster of people we have not named, and we do not borrow awards.
          </p>
          <p>
            The useful version of a project is specific: who it is for, what they need to do, and
            what ships in the first release. Visual direction follows that, instead of arriving as
            a theme.
          </p>
          <p>
            Clients we fit are the ones who can describe the business problem. A new company that
            needs a credible site. A team replacing software that almost works. A founder who wants
            the marketing page and the product to tell the same story.
          </p>
        </div>
        <div>
          <ol className="reason-list">
            <li>
              <span className="num">01</span>
              <div>
                <h3>What we believe</h3>
                <p className="prose">A handsome interface still fails if the offer is vague or the path to contact is buried.</p>
              </div>
            </li>
            <li>
              <span className="num">02</span>
              <div>
                <h3>How we work</h3>
                <p className="prose">Short written decisions, visible increments, and a handover that includes the live product.</p>
              </div>
            </li>
            <li>
              <span className="num">03</span>
              <div>
                <h3>Where we are strongest</h3>
                <p className="prose">React interfaces, product websites, and applications that have to stay understandable after launch.</p>
              </div>
            </li>
          </ol>
          <div className="actions">
            <Link className="btn btn-solid" to="/contact">
              Start a Project
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
