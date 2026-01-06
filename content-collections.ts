import { defineCollection, defineConfig } from "@content-collections/core";

const pages = defineCollection({
	name: "pages",
	directory: "src/content/pages",
	include: "**/*.mdx",
	schema: (z) => ({
		title: z.string(),
	}),
});

const docs = defineCollection({
	name: "docs",
	directory: "src/content/docs",
	include: "**/*.mdx",
	schema: (z) => ({
		title: z.string()
	}),
});

export default defineConfig({
	collections: [pages, docs],
});
