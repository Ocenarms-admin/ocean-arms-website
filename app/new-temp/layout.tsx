import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Main || Rayo - Digital Agency & Personal Portfolio React Nextjs Template',
  description: 'Rayo - Digital Agency & Personal Portfolio React Nextjs Template',
};

export default function NewTempLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          font-family: initial !important;
          background: initial !important;
          color: initial !important;
          -webkit-font-smoothing: initial !important;
          -moz-osx-font-smoothing: initial !important;
        }
      `}</style>
      {children}
    </>
  );
}
