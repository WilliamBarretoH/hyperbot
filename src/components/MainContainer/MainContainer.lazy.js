import React, { lazy, Suspense } from 'react';

const LazyMainContainer = lazy(() => import('./MainContainer'));

const MainContainer = props => (
  <Suspense fallback={null}>
    <LazyMainContainer {...props} />
  </Suspense>
);

export default MainContainer;
