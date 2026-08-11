import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="mt-8 mb-3 font-heading text-xl font-bold tracking-tight first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-6 mb-2 font-heading text-base font-semibold tracking-tight">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-4 leading-relaxed text-muted-foreground last:mb-0">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 list-disc space-y-1 pl-5 text-muted-foreground">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 list-decimal space-y-1 pl-5 text-muted-foreground">
      {children}
    </ol>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  a: ({ children, ...props }) => (
    <a
      className="text-primary underline underline-offset-4 hover:no-underline"
      {...props}
    >
      {children}
    </a>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
