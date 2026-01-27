import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mt-12 mb-6 tracking-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold mt-10 mb-4 tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mt-8 mb-3">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="mb-6 leading-relaxed text-muted-foreground">{children}</p>
    ),
    a: ({ href, children }) => (
      <Link
        href={href ?? "#"}
        className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
      >
        {children}
      </Link>
    ),
    ul: ({ children }) => (
      <ul className="mb-6 ml-6 list-disc space-y-2 text-muted-foreground">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-6 ml-6 list-decimal space-y-2 text-muted-foreground">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-6 my-6 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-sm">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="mb-6 p-4 rounded-lg bg-muted overflow-x-auto font-mono text-sm">
        {children}
      </pre>
    ),
    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        className="rounded-lg my-6"
        {...(props as ImageProps)}
        alt={props.alt ?? ""}
      />
    ),
    hr: () => <hr className="my-8 border-border" />,
    ...components,
  };
}
