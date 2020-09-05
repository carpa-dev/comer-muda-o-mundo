import Head from 'next/head';
import Link from 'next/link';

export default function Home({ initiatives }) {
  const init = initiatives.map((a) => (
    <li key={a.slug}>
      <Link href={'/initiatives/' + a.slug}>
        <a>{a.title}</a>
      </Link>

      {a.description}
    </li>
  ));

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="font-mono text-4xl text-teal-600">Initiatives</h1>
        <ul>{init}</ul>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const initiatives = await (async (context) => {
    const keys = context.keys();
    return keys.map(context);
  })(require.context('../initiatives', false, /\.json/));

  // TODO:
  // validate schema
  return { props: { initiatives } };
}
