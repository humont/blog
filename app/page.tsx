export default function Page() {
  return (
    <article className="home">
      <section className="intro">
        <h1 className="greeting">Hi, I'm Hugo</h1>
        <p className="tagline">
          A <em>software developer</em> based in the <em>UK</em>
        </p>
      </section>

      <section className="about">
        <h2>About</h2>
        <p>
          I am currently working as a <em>full stack web developer</em>,
          creating web apps and sites with <em>payments infrastructures</em>{' '}
          (B2C, marketplaces, products and subscriptions).
        </p>
        <p>
          My MSc focus was on <em>distributed computing</em>,{' '}
          <em>data privacy</em> and <em>ethics</em> (yes, that's a mix of
          technical and theoretical).
        </p>
        <p>
          I spent my 20's working in the fitness industry and running my start
          up - a high quality gourmet protein company in Hong Kong. In 2018 I
          completed an <em>MSc in Advanced Computer Science</em>.
        </p>
      </section>

      <section className="stack">
        <h2>Stack</h2>
        <dl className="stack-grid">
          <div className="stack-category">
            <dt>Languages</dt>
            <dd>
              <ul className="tag-list">
                <li>JavaScript</li>
                <li>TypeScript</li>
                <li>HTML</li>
                <li>CSS</li>
                <li>Java</li>
                <li>SQL</li>
                <li>GraphQL</li>
              </ul>
            </dd>
          </div>
          <div className="stack-category">
            <dt>Technologies</dt>
            <dd>
              <ul className="tag-list">
                <li>Node</li>
                <li>PostgreSQL</li>
                <li>React</li>
                <li>NextJS</li>
                <li>Hasura</li>
                <li>Apollo GraphQL</li>
                <li>Dokku</li>
                <li>Docker</li>
              </ul>
            </dd>
          </div>
          <div className="stack-category">
            <dt>Services</dt>
            <dd>
              <ul className="tag-list">
                <li>Stripe</li>
                <li>Heroku</li>
                <li>Netlify</li>
              </ul>
            </dd>
          </div>
        </dl>
      </section>
    </article>
  );
}
