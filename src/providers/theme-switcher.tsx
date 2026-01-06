import { makePersisted } from "@solid-primitives/storage";
import { Moon, Sun } from "lucide-solid";
import { Show, createEffect, createSignal } from "solid-js";

export const ThemeSwitcher = () => {
	const [darkMode, setDarkMode] = makePersisted(createSignal(false), {
		name: "darkMode",
	});

	createEffect(() => {
		if (darkMode()) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	});

	return (
		<Button
			onClick={() => setDarkMode((theme) => !theme)}
			variant="ghost"
			size="icon"
			aria-label="Toggle dark mode"
		>
			<Show when={darkMode()} fallback={<Moon />}>
				<Sun />
			</Show>
		</Button>
	);
};
