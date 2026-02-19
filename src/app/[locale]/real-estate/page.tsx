import Image from "next/image";
import { type Locale } from "@/config/site";
import { getMessages, translate } from "@/i18n/utils";
import { getProperties } from "@/modules/real-estate/provider";

export const revalidate = 60;

export default async function RealEstatePage({
  params,
}: {
  params: { locale: Locale };
}) {
  const messages = getMessages(params.locale);
  const properties = await getProperties();

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="mb-6">{translate(messages, "realEstate.title")}</h1>
          <p className="text-xl">
            {translate(messages, "realEstate.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <a
              key={property.id}
              href={`/${params.locale}/real-estate/${property.slug}`}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="aspect-[4/3] bg-neutral-200 relative overflow-hidden">
                {property.images?.[0] && (
                  <Image
                    src={property.images[0]}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium z-10">
                  <span
                    className={
                      property.status === "available"
                        ? "text-green-600"
                        : property.status === "reserved"
                          ? "text-amber-600"
                          : "text-neutral-600"
                    }
                  >
                    {translate(messages, `realEstate.${property.status}`)}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl mb-2 group-hover:text-accent transition-colors">
                  {property.title}
                </h3>
                <p className="text-neutral-600 text-sm mb-3">
                  {property.location}
                </p>
                <p className="text-2xl font-semibold text-primary mb-4">
                  {property.price}
                </p>
                <span className="text-accent hover:text-accent-light font-medium">
                  {translate(messages, "realEstate.viewDetails")} →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
