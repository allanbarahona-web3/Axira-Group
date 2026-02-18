"use client";

import { useState } from "react";

type SocialButtonsProps = {
  title: string;
  comingSoonLabel: string;
  socials: {
    tiktok: string | null;
    instagram: string | null;
    facebook: string | null;
  };
};

function TikTokIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.24V2h-3.1v12.4a2.31 2.31 0 1 1-1.6-2.2V9.07a5.41 5.41 0 1 0 4.69 5.35V8.15a7.9 7.9 0 0 0 4.77 1.61V6.69z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5zm8.95 1.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2zM12 7.3A4.7 4.7 0 1 1 7.3 12 4.7 4.7 0 0 1 12 7.3zm0 1.8A2.9 2.9 0 1 0 14.9 12 2.9 2.9 0 0 0 12 9.1z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="M13.5 22v-8.2h2.8l.4-3.2h-3.2v-2c0-.9.3-1.6 1.7-1.6h1.8V4.1A24.9 24.9 0 0 0 14.4 4c-2.6 0-4.4 1.6-4.4 4.6v2H7v3.2h3v8.2h3.5z" />
    </svg>
  );
}

export default function SocialButtons({
  title,
  comingSoonLabel,
  socials,
}: SocialButtonsProps) {
  const [activeComingSoon, setActiveComingSoon] = useState<
    "tiktok" | "instagram" | "facebook" | null
  >(null);

  const handleComingSoon = (network: "tiktok" | "instagram" | "facebook") => {
    setActiveComingSoon(network);
    window.setTimeout(() => {
      setActiveComingSoon((prev) => (prev === network ? null : prev));
    }, 1600);
  };

  return (
    <div className="border border-neutral-200 rounded-xl p-3 sm:p-4 bg-neutral-50">
      <p className="text-sm font-semibold text-primary mb-3">{title}</p>

      <div className="flex items-center justify-center gap-3">
        {socials.tiktok ? (
          <a
            href={socials.tiktok}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="TikTok"
            className="h-11 w-11 rounded-full bg-[#000000] text-white inline-flex items-center justify-center"
          >
            <TikTokIcon />
          </a>
        ) : (
          <button
            type="button"
            aria-disabled="true"
            onClick={() => handleComingSoon("tiktok")}
            aria-label="TikTok"
            className="h-11 w-11 rounded-full bg-[#000000] text-white inline-flex items-center justify-center opacity-75"
          >
            <TikTokIcon />
          </button>
        )}

        {socials.instagram ? (
          <a
            href={socials.instagram}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Instagram"
            className="h-11 w-11 rounded-full text-white inline-flex items-center justify-center bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#515BD4]"
          >
            <InstagramIcon />
          </a>
        ) : (
          <button
            type="button"
            aria-disabled="true"
            onClick={() => handleComingSoon("instagram")}
            aria-label="Instagram"
            className="h-11 w-11 rounded-full text-white inline-flex items-center justify-center bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#515BD4] opacity-75"
          >
            <InstagramIcon />
          </button>
        )}

        {socials.facebook ? (
          <a
            href={socials.facebook}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Facebook"
            className="h-11 w-11 rounded-full bg-[#1877F2] text-white inline-flex items-center justify-center"
          >
            <FacebookIcon />
          </a>
        ) : (
          <button
            type="button"
            aria-disabled="true"
            onClick={() => handleComingSoon("facebook")}
            aria-label="Facebook"
            className="h-11 w-11 rounded-full bg-[#1877F2] text-white inline-flex items-center justify-center opacity-75"
          >
            <FacebookIcon />
          </button>
        )}
      </div>

      {activeComingSoon ? (
        <p className="text-center text-xs text-neutral-500 mt-3">
          {comingSoonLabel}
        </p>
      ) : null}
    </div>
  );
}
