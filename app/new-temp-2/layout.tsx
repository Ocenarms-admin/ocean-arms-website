import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Ocean Arms Technical Services LLC — Industrial & Marine Solutions',
  description: 'UAE-based integrated technical services across Oil & Gas, Marine, Power, and Civil sectors. IRATA certified rope access, inspection, and maintenance throughout the GCC.',
};

export default function CasaFlowLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Montserrat:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Instrument+Serif:ital@0;1&display=swap"
        rel="stylesheet"
      />
      <style>{`
        html, body { margin: 0; padding: 0; background: #F7FBFF; color: #3A5270; }
        *, *::before, *::after { box-sizing: border-box; }
      `}</style>
      {children}
      <Script
        src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"
        strategy="afterInteractive"
      />
    </>
  );
}
