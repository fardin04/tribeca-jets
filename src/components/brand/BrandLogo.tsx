import { AppImage } from "@/components/atoms/AppImage";
import { cn } from "@/lib/cn";
import styles from "./BrandLogo.module.css";

type BrandLogoProps = {
  className?: string;
  src: string;
  tone: "light" | "dark";
};

export function BrandLogo({ className, src, tone }: BrandLogoProps) {
  return (
    <div className={cn(styles.logo, styles[tone], className)}>
      <AppImage
        src={src}
        alt="Tribeca Jets"
        width={400}
        height={222}
        className={styles.image}
      />
    </div>
  );
}