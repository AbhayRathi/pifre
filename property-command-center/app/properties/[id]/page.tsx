import { notFound } from "next/navigation";
import { getPropertyWithScenariosAndRisks, getAllPropertyIds } from "@/lib/db/properties";
import { PropertyWorkspace } from "@/components/property/property-workspace";
import { ErrorBoundary } from "@/components/error-boundary";

export const dynamicParams = true;

export async function generateStaticParams() {
  const ids = await getAllPropertyIds();
  return ids.map((id) => ({ id }));
}

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params;
  const data = await getPropertyWithScenariosAndRisks(id);

  if (!data) {
    notFound();
  }

  return (
    <ErrorBoundary>
      <PropertyWorkspace data={data} />
    </ErrorBoundary>
  );
}
