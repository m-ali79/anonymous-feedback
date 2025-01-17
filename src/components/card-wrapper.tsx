import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";

type cardWrapperProps = {
  cardHeading: string;
  cardDescription: string;
  children: React.ReactNode;
  backLinkLabel: string;
  backLinkHerf: string;
  backLinkDesc: string;
};

export const CardWrapper = ({
  cardHeading,
  cardDescription,
  backLinkDesc,
  backLinkLabel,
  backLinkHerf,
  children,
}: cardWrapperProps) => {
  return (
    <Card className="w-[450px] p-2">
      <CardHeader className="text-center md:text-6xl text-4xl font-extrabold tracking-tighter">
        {cardHeading}
      </CardHeader>
      <CardDescription className="text-center  text-primary -mt-3 mb-4">
        {cardDescription}
      </CardDescription>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex gap-x-2 items-center w-full justify-center">
        <p>{backLinkDesc}</p>
        <Link href={backLinkHerf} className="text-blue-500">
          {backLinkLabel}
        </Link>
      </CardFooter>
    </Card>
  );
};
