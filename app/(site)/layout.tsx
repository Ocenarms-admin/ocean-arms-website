import NavbarV2 from "@/components/NavbarV2";
import FooterV2 from "@/components/FooterV2";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavbarV2 />
      {children}
      <FooterV2 />
    </>
  );
}
