import { getExploreMapLayout } from '../../components/explore/ExploreMapLayout';
import type { Initiative } from '../../components/initiatives/types';
import { PageOverlayWrapper } from '../../components/navigation/PageOverlayWrapper';

interface InitiativeDetailsProps {
  initiative: Initiative;
}

export default function InitiativeDetails({
  initiative,
}: InitiativeDetailsProps) {
  return (
    <PageOverlayWrapper>
      <h1 className="mb-4 font-bold text-xl">{initiative.title}</h1>
      <p className="mb-4">{initiative.description}</p>
      <p>{initiative ? JSON.stringify(initiative) : null}</p>
    </PageOverlayWrapper>
  );
}

InitiativeDetails.getLayout = getExploreMapLayout;

export async function getStaticProps({ ...ctx }) {
  const { slug } = ctx.params;

  const ini = await import(`../../content/initiatives/${slug}.json`).then(
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
  })(require.context('../../content/initiatives', true, /\.json/));

  const paths = slugs.map((slug) => `/iniciativas/${slug}`);

  return {
    paths,
    fallback: false,
  };
}
