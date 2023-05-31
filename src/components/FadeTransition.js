import React from 'react';
import { Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

const FadeTransition = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest}>
      {({ match }) => (
        <CSSTransition
          in={match != null}
          timeout={300}
          classNames="transition-opacity duration-300"
          unmountOnExit
        >
          <div className="opacity-0 scale-90">
            <Component />
          </div>
        </CSSTransition>
      )}
    </Route>
  );
};

export default FadeTransition;
