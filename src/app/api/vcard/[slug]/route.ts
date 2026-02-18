import { NextResponse } from "next/server";
import { digitalCard } from "@/config/digitalCard";

export function GET(
  _request: Request,
  { params }: { params: { slug: string } },
) {
  if (params.slug !== digitalCard.slug) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "FN:Erick Monge Gonzalez",
    "ORG:Axira Group – Advisory & Property Services",
    "TITLE:Business Consultant & Real Estate",
    "TEL;TYPE=CELL:+447735701311",
    "EMAIL;TYPE=INTERNET:erick.monge@axiragroup.ae",
    "URL:https://axira-group-demo.vercel.app",
    "NOTE:Digital business card",
    "END:VCARD",
  ].join("\n");

  return new NextResponse(vcard, {
    status: 200,
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="Erick-Monge-Gonzalez.vcf"',
      "Cache-Control": "no-store",
    },
  });
}
