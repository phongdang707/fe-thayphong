import React from 'react';
import loadable from 'utils/loadable';
import Loading from 'components/LoadingLoadable';

export default loadable(() => import('./index'), {
  fallback: <Loading use="init" />,
});
