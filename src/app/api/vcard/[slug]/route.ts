import { NextResponse } from "next/server";
import { digitalCard } from "@/config/digitalCard";

export function GET(
  _request: Request,
  { params }: { params: { slug: string } },
) {
  if (params.slug !== digitalCard.slug) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const whatsappNumber = digitalCard.whatsappE164.replace(/\s+/g, "");

  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${digitalCard.fullName}`,
    `ORG:${digitalCard.company}`,
    `TITLE:${digitalCard.title}`,
    `TEL;TYPE=CELL:${whatsappNumber}`,
    `EMAIL;TYPE=INTERNET:${digitalCard.email}`,
    `URL:${digitalCard.website}`,
    "NOTE:Digital business card",
    "END:VCARD",
  ].join("\r\n");

  return new NextResponse(vcard, {
    status: 200,
    headers: {
      "Content-Type": "text/x-vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="Erick-Monge-Gonzalez.vcf"',
      "Cache-Control": "no-store",
    },
  });
}
