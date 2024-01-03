import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: "/mp4ra.github.io", // FIXME: This is a hack to make the site work on GitHub Pages
    output: "export",
    pageExtensions: ["ts", "tsx", "mdx"],
    env: {
        FFC_URL: "https://mpeggroup.github.io/FileFormatConformance",
        BUILD_TIMESTAMP: new Date().toLocaleString("default", {
            month: "long",
            day: "numeric",
            year: "numeric"
        })
    }
};

const withMDX = createMDX({
    options: {
        extension: /\.mdx?$/,
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, rehypeHighlight]
    }
});
export default withMDX(nextConfig);
