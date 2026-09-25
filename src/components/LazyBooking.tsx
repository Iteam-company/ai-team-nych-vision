'use client';

import dynamic from 'next/dynamic';

/** Loaded client-only, like LazyLeadForm — no server-rendered date/time state to hydrate. */
const LazyBooking = dynamic(() => import('./Booking'), { ssr: false });

export default LazyBooking;
