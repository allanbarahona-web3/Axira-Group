import { notFound } from "next/navigation";
import { type Locale } from "@/config/site";
import { getMessages, translate } from "@/i18n/utils";
import {
  getProperties,
  getPropertyBySlug,
} from "@/modules/real-estate/provider";
import ImageGallery from "@/components/ui/ImageGallery";

export const revalidate = 60;

export async function generateStaticParams() {
  const properties = await getProperties();
  return properties.map((property) => ({
    slug: property.slug,
  }));
}

export default async function PropertyDetailPage({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const messages = getMessages(params.locale);
  const property = await getPropertyBySlug(params.slug);

  if (!property) {
    notFound();
  }

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <a
              href={`/${params.locale}/real-estate`}
              className="text-accent hover:text-accent-light font-medium"
            >
              ← Back to Real Estate
            </a>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <ImageGallery images={property.images} title={property.title} />

            <div>
              <div className="mb-4">
                <span
                  className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
                    property.status === "available"
                      ? "bg-green-100 text-green-700"
                      : property.status === "reserved"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-neutral-100 text-neutral-700"
                  }`}
                >
                  {translate(messages, `realEstate.${property.status}`)}
                </span>
              </div>

              <h1 className="mb-4">{property.title}</h1>
              <p className="text-xl text-neutral-600 mb-6">
                {property.location}
              </p>
              <p className="text-4xl font-semibold text-primary mb-8">
                {property.price}
              </p>

              <div className="prose prose-lg max-w-none mb-8">
                <p>{property.description}</p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-xl mb-8">
                <h3 className="text-lg font-semibold mb-4">Property Details</h3>
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm text-neutral-600">Type</dt>
                    <dd className="font-medium">{property.type}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-neutral-600">Bedrooms</dt>
                    <dd className="font-medium">{property.bedrooms}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-neutral-600">Bathrooms</dt>
                    <dd className="font-medium">{property.bathrooms}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-neutral-600">Area</dt>
                    <dd className="font-medium">{property.area}</dd>
                  </div>
                </dl>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href={`/${params.locale}/contact`} className="btn-primary">
                  {translate(messages, "common.getInTouch")}
                </a>
                <a
                  href={`https://wa.me/447735701311?text=I'm interested in ${property.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-accent"
                >
                  {translate(messages, "contact.whatsapp")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
