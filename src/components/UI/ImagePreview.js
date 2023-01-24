import { AspectRatio, Image } from '@chakra-ui/react';

export const ImagePreview = ({ src, alt, rounded, ...props }) => {
  return (
    <AspectRatio {...props}>
      <Image
        src={src}
        alt={alt}
        fit="cover"
        rounded={rounded ? null : 'md'}
        fallbackSrc="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
        {...rounded}
      />
    </AspectRatio>
  );
};
