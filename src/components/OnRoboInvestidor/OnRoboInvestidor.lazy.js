import React, { lazy, Suspense } from 'react';

const LazyOnRoboInvestidor = lazy(() => import('./OnRoboInvestidor'));

const OnRoboInvestidor = props => (
  <Suspense fallback={null}>
    <LazyOnRoboInvestidor {...props} />
  </Suspense>
);

export default OnRoboInvestidor;
