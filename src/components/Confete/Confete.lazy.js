import React, { lazy, Suspense } from 'react';

const LazyConfete = lazy(() => import('./Confete'));

const Confete = props => (
  <Suspense fallback={null}>
    <LazyConfete {...props} />
  </Suspense>
);

export default Confete;
