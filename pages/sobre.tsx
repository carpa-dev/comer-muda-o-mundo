import { PageWrapper } from '../components/navigation/PageWrapper';
import { MarkdownContent } from '../components/markdown/MarkdownContent';
import { markdownToHtml } from '../components/markdown/md-to-html';

interface AboutProps {
  body: string;
}

export default function About({ body }: AboutProps) {
  return (
    <PageWrapper>
      <MarkdownContent content={body} />
    </PageWrapper>
  );
}

export async function getStaticProps() {
  const page = await import('../content/pages/about.json').then(
    (a) => a.default
  );

  const body = await markdownToHtml(page.body || '');

  return { props: { body } };
}
