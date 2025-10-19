// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
var defaultLocale = "lt";
var Page = defineDocumentType(() => ({
  name: "Page",
  contentType: "mdx",
  filePathPattern: "pages/**/*.mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    layout: { type: "string", required: false },
    hero: { type: "json", required: false },
    sections: { type: "json", required: false },
    seo: { type: "json", required: false },
    navigation: { type: "json", required: false }
  },
  computedFields: {
    locale: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, "")
    },
    slugSegments: {
      type: "json",
      resolve: (doc) => {
        const segments = doc._raw.flattenedPath.split("/").slice(1, -1);
        if (segments.length === 1 && segments[0] === "home") {
          return [];
        }
        return segments;
      }
    },
    slug: {
      type: "string",
      resolve: (doc) => {
        const segments = doc._raw.flattenedPath.split("/").slice(1, -1);
        if (segments.length === 1 && segments[0] === "home") {
          return "home";
        }
        const slug = segments.join("/");
        return slug || "home";
      }
    },
    route: {
      type: "string",
      resolve: (doc) => {
        const locale = doc._raw.sourceFileName.replace(/\.mdx$/, "");
        const segments = doc._raw.flattenedPath.split("/").slice(1, -1);
        const normalizedSegments = segments.length === 1 && segments[0] === "home" ? [] : segments;
        const slug = normalizedSegments.join("/");
        const normalized = slug || "home";
        const localePrefix = locale === defaultLocale ? "" : `/${locale}`;
        const trailing = normalized === "home" ? "" : `/${normalized}`;
        const path = `${localePrefix}${trailing}`;
        return path === "" ? "/" : path;
      }
    },
    isDefaultLocale: {
      type: "boolean",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, "") === defaultLocale
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Page],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap"
        }
      ]
    ]
  }
});
export {
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-4JWVX2GV.mjs.map
