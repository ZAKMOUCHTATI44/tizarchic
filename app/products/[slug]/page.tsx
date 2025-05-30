import { Metadata } from "next";
import FetchSingle from "@/components/products/single-product/FetchSingle";
import { slugToText } from "@/lib/slugToText";
type Props = {
  params: Promise<{ slug: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = slugToText(slug);
  return {
    title: title,
  };
}

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  return (
    <div className="my-12">
      <FetchSingle slug={slug} />
    </div>
  );
};

export default page;
