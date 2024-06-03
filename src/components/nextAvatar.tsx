import { ImageProps, getImageProps } from "next/image";
import { omit, pick } from "lodash/fp";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

type Props = Omit<ImageProps, "fill">;

export default function NextAvatar(props: Props) {
  const imageProps = getImageProps({ width: 40, height: 40, ...props }).props;

  return (
    <Avatar
      className={props.className}
      style={pick(["width", "height"], imageProps)}
    >
      <AvatarImage
        {...omit(["blurWidth", "blurHeight", "style"], imageProps)}
        style={pick(["objectFit", "objectPosition"], imageProps.style)}
      />
      {!imageProps.src && (
        <AvatarFallback style={imageProps.style}>
          <User className="h-full w-full stroke-primary" />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
