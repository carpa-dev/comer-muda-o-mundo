import MuiBreadcrumbs, {
  BreadcrumbsProps as MuiBreadcrumbsProps,
} from '@material-ui/core/Breadcrumbs';
import MuiLink from '@material-ui/core/Link';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Link from 'next/link';

interface BreadcrumbItem {
  href: string;
  label: string;
}

interface BreadcrumbsProps extends MuiBreadcrumbsProps {
  items: Array<BreadcrumbItem>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    breadcrumbs: {
      marginBottom: theme.spacing(2),
    },
    link: {
      cursor: 'pointer',
    },
  })
);

function Breadcrumbs({ items, ...rest }: BreadcrumbsProps) {
  const classes = useStyles();
  const lastItemIndex = items.length - 1;

  return (
    <MuiBreadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      className={classes.breadcrumbs}
      {...rest}
    >
      {items.map((item, index) => (
        <Link key={index} href={item.href}>
          <MuiLink
            variant="body2"
            className={classes.link}
            color={index === lastItemIndex ? 'textPrimary' : 'inherit'}
          >
            {item.label}
          </MuiLink>
        </Link>
      ))}
    </MuiBreadcrumbs>
  );
}

export default Breadcrumbs;
