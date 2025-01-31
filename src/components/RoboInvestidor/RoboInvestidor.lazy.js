import React, { lazy, Suspense } from 'react';

const LazyRoboInvestidor = lazy(() => import('./RoboInvestidor'));

const RoboInvestidor = props => (
  <Suspense fallback={null}>
    <LazyRoboInvestidor {...props} />
  </Suspense>
);

export default RoboInvestidor;
