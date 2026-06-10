import { notFound } from "next/navigation";
import { getMockPropertyById } from "@/lib/data/mock-properties";
import { PropertyWorkspace } from "@/components/property/property-workspace";

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params;
  const propertyData = getMockPropertyById(id);

  if (!propertyData) {
    notFound();
  }

  return <PropertyWorkspace data={propertyData} />;
}

export function generateStaticParams() {
  return [
    { id: "oakland-adu-expansion" },
    { id: "san-jose-vacant-lot" },
    { id: "sf-adaptive-reuse" },
  ];
}
