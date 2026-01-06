import { createListCollection } from "@ark-ui/solid";
import type { RouteSectionProps } from "@solidjs/router";
import { useStore } from "@tanstack/solid-store";
import { A, useLocation, useNavigate } from "@solidjs/router";
import { allDocs } from "content-collections";
import { TbChevronDown, TbStarFilled } from "lucide-solid";
import { type Component, For, Index, type ParentComponent } from "solid-js";

const SideNavLink: ParentComponent<{ href: string }> = (props) => {
	return (
		<A
			href={props.href}
			// class={css({ textStyle: "sm" })}
			// inactiveClass={}
			// activeClass={}
			end>
			{props.children}
		</A>
	);
};

const SelectFramework: Component<{ value: string }> = (props) => {
	interface Item {
		label: string;
		value: string;
		disabled?: boolean;
	}

	const collection = createListCollection<Item>({
		items: [
			{ label: "UnoCSS", value: "unocss", disabled: true },
			{ label: "Tailwind", value: "tailwind" },
			{ label: "Panda", value: "panda" },
		],
	});

	const navigate = useNavigate();
	const location = useLocation();

	return (
		<Select.Root
			size="sm"
			positioning={{ sameWidth: true }}
			value={[props.value]}
			onValueChange={({ value }) => {
				// Replace the current path with the new framework
				const newLocation = location.pathname.replace(props.value, value[0]);
				navigate(newLocation, {
					replace: true,
					scroll: false,
				});
			}}
			collection={collection}
		>
			<Select.Control>
				<Select.Trigger>
					<Select.ValueText />
					<TbChevronDown />
				</Select.Trigger>
			</Select.Control>
			<Select.Positioner>
				<Select.Content>
					<Index each={collection.items}>
						{(item) => (
							<Select.Item item={item()} justifyContent="start" gap="2">
								<Select.ItemText> {item().label}</Select.ItemText>
							</Select.Item>
						)}
					</Index>
				</Select.Content>
			</Select.Positioner>
		</Select.Root>
	);
};

const SideNav: Component<{ framework: string }> = (props) => {
	const categoryMap: Record<string, string> = {
		text: "Text Effects",
		background: "Backgrounds",
		component: "Components",
		"device-mock": "Device Mocks",
		effect: "Effects",
	};

	const sections = [
		{
			title: "Overview",
			links: [
				{ title: "Introduction", href: "/docs/{{framework}}" },
				{ title: "with Panda", href: "/docs/panda/setup" },
				{ title: "with Tailwind", href: "/docs/tailwind/setup" },
			],
		},
		...Object.entries(
			allDocs.reduce(
				(acc: Record<string, { title: string; href: string }[]>, doc) => {
					const category = doc.category;
					if (!acc[category]) {
						acc[category] = [];
					}
					acc[category].push({
						title: doc.title,
						href: `/docs/{{framework}}/components/${doc._meta.path}`,
					});
					return acc;
				},
				{},
			),
		)
			.sort()
			.map(([category, links]) => ({
				title: categoryMap[category],
				links: links.sort(),
			})),
	];

	const open = useStore(store, (state) => state.sideNavOpen);

	return (
		<aside
			style={{
				height: "calc(100vh - 3rem)",
				top: "3rem",
			}}
			class={css({
				position: { base: "fixed", md: "sticky" },
				insetX: 0,
				display: "flex",
				flexDirection: "column",
				paddingY: "2",
				paddingX: { base: "4", md: "unset" },
				backgroundColor: "bg.canvas",
				zIndex: "modal",
				hideBelow: "md",
			})}
			classList={{
				[css({ hideBelow: "md" })]: !open(),
			}}
		>
			<Stack gap="6" flexGrow={1} overflowY="auto">
				<For each={sections}>
					{(section) => (
						<Stack gap="2">
							<SideNavHeading>{section.title}</SideNavHeading>
							<For each={section.links}>
								{(link) => (
									<SideNavLink
										href={link.href.replace("{{framework}}", props.framework)}
									>
										{link.title}
									</SideNavLink>
								)}
							</For>
						</Stack>
					)}
				</For>
			</Stack>
			<Divider my="2" />
			<SelectFramework value={props.framework} />
		</aside>
	);
};

export default function DocsLayout(props: RouteSectionProps) {
	return (
			<div>
				<SideNav framework={props.params.framework} />
				<main class={css({ width: "full", minWidth: "0" })}>
					{props.children}

					<footer>
						something here
					</footer>
				</main>
			</div>
	);
}
