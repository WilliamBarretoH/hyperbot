import React, { lazy, Suspense } from 'react';

const LazyTradePanel = lazy(() => import('./TradePanel'));

const TradePanel = props => (
  <Suspense fallback={null}>
    <LazyTradePanel {...props} />
  </Suspense>
);

export default TradePanel;
