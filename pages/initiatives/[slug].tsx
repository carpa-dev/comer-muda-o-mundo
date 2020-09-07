import { getExploreMapLayout } from '../../components/explore/ExploreMapLayout';
import { PageWrapper } from '../../components/navigation/PageWrapper';

export default function Initiative({ initiative }: any) {
  return <PageWrapper>initiative {JSON.stringify(initiative)}</PageWrapper>;
}

Initiative.getLayout = getExploreMapLayout;

export async function getStaticProps({ ...ctx }) {
  const { slug } = ctx.params;

  const ini = await import(`../../initiatives/${slug}.json`).then(
    (a) => a.default
  );

  if (!ini) {
    throw new Error('Couldnt find initiative with slug: ' + slug);
  }

  return { props: { initiative: ini } };
}

export async function getStaticPaths() {
  const slugs = ((context) => {
    const keys = context.keys();

    // replace './my-initiative.json' by 'my-initiative'
    return keys.map((a) => a.replace(/\.json$/, '').replace(/^\.\//, ''));
  })(require.context('../../initiatives', true, /\.json/));

  const paths = slugs.map((slug) => `/initiatives/${slug}`);

  return {
    paths,
    fallback: false,
  };
}
