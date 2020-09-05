export default function Initiative({ initiative }) {
  return <div>initiative {JSON.stringify(initiative)}</div>;
}

export async function getStaticProps({ ...ctx }) {
  const { initiative } = ctx.params;

  // This could get bad when there's lots of initiatives
  const initiatives = await (async (context) => {
    const keys = context.keys();
    return keys.map(context);
  })(require.context('../../initiatives', false, /\.json/));

  const ini = initiatives.find((a) => a.slug === initiative);
  if (!ini) {
    throw new Error('Couldnt find initiative with slug: ' + initiative);
  }

  return { props: { initiative: ini } };
}

export async function getStaticPaths() {
  const slugs = ((context) => {
    const keys = context.keys();
    const value = keys.map(context);

    return value.map((a) => a.slug);
  })(require.context('../../initiatives', true, /\.json/));

  // TODO
  // validate uniqueness
  // is each initiative has its own slug
  const paths = slugs.map((slug) => `/initiatives/${slug}`);

  return {
    paths,
    fallback: false,
  };
}
