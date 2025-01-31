import React, { lazy, Suspense } from 'react';

const LazyHeaderUser = lazy(() => import('./HeaderUser'));

const HeaderUser = props => (
  <Suspense fallback={null}>
    <LazyHeaderUser {...props} />
  </Suspense>
);

export default HeaderUser;
