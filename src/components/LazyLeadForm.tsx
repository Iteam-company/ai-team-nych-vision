'use client';

import dynamic from 'next/dynamic';

/**
 * The lead form pulls in phone-number metadata for every country, so it is
 * loaded in its own chunk, in the browser only.
 */
const LazyLeadForm = dynamic(() => import('./LeadForm'), { ssr: false });

export default LazyLeadForm;
