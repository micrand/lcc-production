import { useAppStore } from "@/store/appStore";
import Image, { ImageProps } from "next/image";
import { FC } from "react";

interface ImageKitProps extends Omit<ImageProps, "loader"> {
  src: string;
  original?: boolean;
}

const imageKitLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  const isExternal = src.startsWith("https");
  if (!isExternal) {
    return `${process.env.NEXT_PUBLIC_IMAGEKIT_URL}/tr:f-webp,w-${width},q-${quality || 75}${src}`;
  }
  const params = new URLSearchParams();
  params.set('w', width.toString());
  params.set('q', quality?.toString() || '75');
  return `/_next/image?url=${encodeURIComponent(src)}&${params.toString()}`;
};
const imageKitLoaderOriginal = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  const isExternal = src.startsWith("https");
  if (!isExternal) {
    return `${process.env.NEXT_PUBLIC_IMAGEKIT_URL}/tr:w-${width},q-${quality || 75}${src}`;
  }
  const params = new URLSearchParams();
  params.set('w', width.toString());
  params.set('q', quality?.toString() || '75');
  return `/_next/image?url=${encodeURIComponent(src)}&${params.toString()}`;
};

const ImageKit: FC<ImageKitProps> = ({ src, alt, width, height, priority, loading = 'lazy', original = false, ...props }) => {
  const usingImageKit = useAppStore((state) => state.usingImageKit);

  return (
    <Image
      loader={usingImageKit ? !original ? imageKitLoader : imageKitLoaderOriginal : undefined}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      {...props}
    />
  );
};

export default ImageKit;
