"use client";

import { useEffect } from "react";

type LocaleAttributeProps = {
  locale: string;
};

export default function LocaleAttribute({ locale }: LocaleAttributeProps) {
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return null;
}

