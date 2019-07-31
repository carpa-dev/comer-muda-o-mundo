/**
 * Often a button that turns into a loading bar is needed
 * There are two main upsides:
 * 1 - User is blocked of hitting the button (imagine double click)
 * 2 - Same visual space is used to indicate the loading action
 *     which makes designing the screen easier
 *
 * Implementation:
 * The idea is to ALWAYS have the button displayed on the DOM
 * just hidding (with visibility: hidden) from the user
 * We do so that the loading bar uses same space as the button
 * providing a pleasing experience for both the user and the developer
 * As following (pseudo) code is not needed anymore
 *  .loading { height: $button-height; width: $button-width; }
 */
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import React from 'react';
// import PropTypes from 'prop-types';
import Button, { ButtonProps } from '@material-ui/core/Button';

function LoadingButton(props: { loading: boolean } & ButtonProps) {
  const classes = useStyles();
  const { loading, fullWidth, style, ...buttonProps } = props;

  return (
    <div className={classes.wrapper} style={wrapperStyle(fullWidth)}>
      {loading && (
        <div className={classes.loading}>
          <LinearProgress />
        </div>
      )}
      <Button
        style={{ ...style, ...buttonStyles(loading) }}
        fullWidth={fullWidth}
        disabled={loading}
        {...buttonProps}
      />
    </div>
  );
}

// function childrenOf(...types: any) {
//   let fieldType = PropTypes.shape({
//     type: PropTypes.oneOf(types),
//   });

//   return PropTypes.oneOfType([fieldType, PropTypes.arrayOf(fieldType)]);
// }

// LoadingButton.propTypes = {
//   children: childrenOf(Button).isRequired,
// };

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      position: 'relative',
    },
    loading: {
      transform: 'translateY(50%)',
      position: 'absolute',
      height: '100%',
      width: '100%',
    },
  })
);

/**
 * Helpers
 */
// wrapper needs to grow when button is full width (aka width: 100)
function wrapperStyle(fullWidth: boolean | undefined) {
  if (fullWidth) {
    return {
      width: '100%',
    };
  }
  return {
    display: 'inline-block',
  };
}

// simple wrapper to simplify render method
// function withStyle(children: any, styles: any) {
//   return React.cloneElement(children, {
//     style: styles,
//   });
// }

// button is still kept in the dom, just hidden from user
function buttonStyles(loading: boolean) {
  if (loading) {
    return {
      visibility: 'hidden' as any,
    };
  } else {
    return {};
  }
}

export default LoadingButton;
