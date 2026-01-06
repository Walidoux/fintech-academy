// Acts like a JSX factory for compiling MDX documents.

import type { Component } from "solid-js";

// biome-ignore lint/suspicious/noExplicitAny: different components have different props
export const useMDXComponents: () => Record<string, Component<any>> = () => ({
	h1: (props) => (
		<h1  {...props} />
	),
	h2: (props) => <h2 {...props} />,
	h3: (props) => <h3 {...props} />,
	h4: (props) => <h4 {...props} />,
	h5: (props) => <h5 {...props} />,
	h6: (props) => <h6 {...props} />,
	p: (props) => <p {...props} />,
	code: (props) => <code {...props} />,
	a: (props) => <a {...props} />,
	hr: (props) => <hr {...props} />,
	i: (props) => <i {...props} />,
	b: (props) => <b {...props} />,
	em: (props) => <em {...props} />,
	strong: (props) => <strong {...props} />,
});
