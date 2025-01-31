import React, { lazy, Suspense } from 'react';

const LazyGrafico = lazy(() => import('./Grafico'));

const Grafico = props => (
  <Suspense fallback={null}>
    <LazyGrafico {...props} />
  </Suspense>
);

export default Grafico;
