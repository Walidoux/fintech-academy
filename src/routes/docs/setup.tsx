import { Title } from "@solidjs/meta";
import type { RouteSectionProps } from "@solidjs/router";
import { type Component, lazy } from "solid-js";
import { Dynamic } from "solid-js/web";

export default function SetupPage(props: RouteSectionProps) {
	const pages: Record<string, Component> = {
		dooc: lazy(() => import("~/content/pages/dooc.mdx")),
	};

	return (
		<>
			<Title>Using Mystic UI with {props.params.ese}</Title>
			<Dynamic component={pages[props.params.ese]} />
		</>
	);
}
