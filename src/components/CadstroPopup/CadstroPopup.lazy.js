import React, { lazy, Suspense } from 'react';

const LazyCadstroPopup = lazy(() => import('./CadstroPopup'));

const CadstroPopup = props => (
  <Suspense fallback={null}>
    <LazyCadstroPopup {...props} />
  </Suspense>
);

export default CadstroPopup;
