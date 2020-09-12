import styles from './MarkdownContent.module.css';

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div
      className={styles.markdown}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
