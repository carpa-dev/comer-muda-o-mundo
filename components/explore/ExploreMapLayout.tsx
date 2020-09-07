import { Fragment } from 'react';

import { EXPLORE_MAP_WRAPPER_ID } from './dom';
import styles from './ExploreMap.module.css';

/**
 * Shared map container between pages.
 * This prevents the map from unmounting while navigating between pages
 * with ExploreMapLayout.
 *
 * The map widget itself must be initialized in the page component.
 */
export function getExploreMapLayout(page: JSX.Element) {
  return (
    <Fragment>
      <div id={EXPLORE_MAP_WRAPPER_ID} className={styles.mapArea}></div>
      {page}
    </Fragment>
  );
}
