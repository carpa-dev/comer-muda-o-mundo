import Head from 'next/head';

export default function Home({ initiatives }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="font-mono text-4xl text-teal-600">
          initiatives {JSON.stringify(initiatives)}
        </h1>
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
