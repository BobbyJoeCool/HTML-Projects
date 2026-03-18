/**
 * @class DamageDiceApp
 * @extends {foundry.applications.api.HandlebarsApplicationMixin(foundry.applications.api.ApplicationV2)}
 * @description Main application class for the Damage Dice Roller module. Provides a UI for building and rolling damage formulas in Foundry VTT.
 */
class DamageDiceApp extends foundry.applications.api.HandlebarsApplicationMixin(
	foundry.applications.api.ApplicationV2,
) {
	/**
	 * @static
	 * @constant {Object} DEFAULT_OPTIONS - Default configuration options for the application.
	 * @property {string} id - Unique identifier for the application.
	 * @property {string[]} classes - CSS classes for styling the window.
	 * @property {Object} window - Window-specific options.
	 * @property {string} window.title - Title displayed in the window header.
	 * @property {boolean} window.resizable - Whether the window can be resized.
	 * @property {boolean} window.frame - Whether to show the window frame.
	 * @property {Object} position - Initial position and size of the window.
	 * @property {number} position.width - Width of the window in pixels.
	 * @property {string} position.height - Height of the window (auto or fixed).
	 * @property {number} position.left - Left position of the window.
	 * @property {number} position.top - Top position of the window.
	 */
	static DEFAULT_OPTIONS = {
		id: "damage-dice-app",
		classes: ["damage-dice-window"],
		window: {
			title: "Damage Dice Roller",
			resizable: false,
			frame: true,
		},
		position: {
			width: 250,
			height: "auto",
			left: 300,
			top: 200,
		},
	};

	/**
	 * @static
	 * @constant {Object} PARTS - Template parts configuration for the application.
	 * @property {Object} content - Content template configuration.
	 * @property {string} content.template - Path to the main content template.
	 */
	static PARTS = {
		content: {
			template: "modules/damage-dice-roller/templates/dice-app.html",
		},
	};

	/**
	 * @async
	 * @method _renderFrame
	 * @param {Object} options - Rendering options passed from the parent class.
	 * @returns {HTMLElement} The rendered frame element with event listeners attached.
	 * @description Renders the application frame, sets up the custom header, and attaches event listeners for all interactive elements.
	 */
	async _renderFrame(options) {
		const frame = await super._renderFrame(options);

		const header_html = await foundry.applications.handlebars.renderTemplate(
			"modules/damage-dice-roller/templates/header.html",
			this,
		);

		const $header = $(".window-header", frame);
		$header.empty().addClass("flexrow").append(header_html);

		// --- Close button ---
		$header.find(".close").click((ev) => {
			ev.preventDefault();
			this.close(); // calls Foundry's Application.close()
		});

		// --- Toggle Minimize button ---
		const $minBtn = $header.find(".minimize");
		let minimized = false;

		$minBtn.click((ev) => {
			ev.preventDefault();
			if (!minimized) {
				// Minimize: hide the content and change button to '+'
				$(frame).find(".window-content").slideUp(150);
				$minBtn.text("+");
				minimized = true;
			} else {
				// Restore: show content and revert button to '-'
				$(frame).find(".window-content").slideDown(150);
				$minBtn.text("–");
				minimized = false;
			}
		});

		$(frame).on("click", "#d4-btn", () => {
			const $input = $(frame).find("#d4-text");
			let count = parseInt($input.val()) || 0;
			count += 1;
			$input.val(count);
		});

		$(frame).on("click", "#d6-btn", () => {
			const $input = $(frame).find("#d6-text");
			let count = parseInt($input.val()) || 0;
			count += 1;
			$input.val(count);
		});

		$(frame).on("click", "#d8-btn", () => {
			const $input = $(frame).find("#d8-text");
			let count = parseInt($input.val()) || 0;
			count += 1;
			$input.val(count);
		});

		$(frame).on("click", "#d10-btn", () => {
			const $input = $(frame).find("#d10-text");
			let count = parseInt($input.val()) || 0;
			count += 1;
			$input.val(count);
		});

		$(frame).on("click", "#d12-btn", () => {
			const $input = $(frame).find("#d12-text");
			let count = parseInt($input.val()) || 0;
			count += 1;
			$input.val(count);
		});

		$(frame).on("click", "#d20-btn", () => {
			const $input = $(frame).find("#d20-text");
			let count = parseInt($input.val()) || 0;
			count += 1;
			$input.val(count);
		});

		$(frame).on("click", "#add-damage-btn", () => {
			let formInp = "";
			const $d4 = parseInt($(frame).find("#d4-text").val(), 10) || 0;
			const $d6 = parseInt($(frame).find("#d6-text").val(), 10) || 0;
			const $d8 = parseInt($(frame).find("#d8-text").val(), 10) || 0;
			const $d10 = parseInt($(frame).find("#d10-text").val(), 10) || 0;
			const $d12 = parseInt($(frame).find("#d12-text").val(), 10) || 0;
			const $d20 = parseInt($(frame).find("#d20-text").val(), 10) || 0;
			const $static =
				parseInt($(frame).find("#static-damage-text").val(), 10) || 0;
			const $damType = $(frame).find("#damage-type").val();
			const $rollFrame = $(frame).find("#formula-text");

			if ($d4 > 0) {
				if (formInp.length > 0) formInp += " + ";
				formInp += `${$d4}d4`;
			}

			if ($d6 > 0) {
				if (formInp.length > 0) formInp += " + ";
				formInp += `${$d6}d6`;
			}

			if ($d8 > 0) {
				if (formInp.length > 0) formInp += " + ";
				formInp += `${$d8}d8`;
			}

			if ($d10 > 0) {
				if (formInp.length > 0) formInp += " + ";
				formInp += `${$d10}d10`;
			}

			if ($d12 > 0) {
				if (formInp.length > 0) formInp += " + ";
				formInp += `${$d12}d12`;
			}

			if ($d20 > 0) {
				if (formInp.length > 0) formInp += " + ";
				formInp += `${$d20}d20`;
			}

			if ($static > 0) {
				if (formInp.length > 0) formInp += " + ";
				formInp += `${$static}`;
			}

			if (formInp.length > 0) {
				formInp += ` ${$damType}`;
				if ($rollFrame.val().length > 0) {
					$rollFrame.val($rollFrame.val() + `\n${formInp}`);
				} else {
					$rollFrame.val(formInp);
				}
				resetDice(frame);
			}
		});

		$(frame).on("click", "#reset-btn", () => {
			resetDice(frame);
			const $frame = $(frame);

			// Clear formula textarea
			const $formula = $frame.find("#formula-text");
			$formula.val("");

			// Clear output
			$frame.find("#row4-output").html("Roll results appear here");
		});

		$(frame).on("click", "#roll-btn", async () => {
			const rawRollFormula = $(frame).find("#formula-text").val();
			const lines = rawRollFormula
				.split("\n")
				.map((l) => l.trim())
				.filter((l) => l.length > 0);

			const lineRegex = /^(.*?)(?:\s+([A-Za-z]+))?$/;

			const rolls = lines.map((line) => {
				const match = line.match(lineRegex);
				return {
					original: line,
					formula: match[1].trim(),
					damageType: match[2] || "",
					result: null,
				};
			});

			// Maps for full name and icons
			const DAMAGE_TYPE_MAP = {
				A: "Acid",
				B: "Bludgeoning",
				C: "Cold",
				Fi: "Fire",
				Fo: "Force",
				L: "Lightning",
				N: "Necrotic",
				Pi: "Piercing",
				Po: "Poison",
				Py: "Psychic",
				R: "Radiant",
				S: "Slashing",
				T: "Thunder",
			};

			const MODULE_ID = "damage-dice-roller";
			const DAMAGE_ICON_MAP = {
				A: `modules/${MODULE_ID}/artwork/acid.png`,
				B: `modules/${MODULE_ID}/artwork/bludgeon.png`,
				C: `modules/${MODULE_ID}/artwork/cold.png`,
				Fi: `modules/${MODULE_ID}/artwork/fire.png`,
				Fo: `modules/${MODULE_ID}/artwork/force.png`,
				L: `modules/${MODULE_ID}/artwork/lightning.png`,
				N: `modules/${MODULE_ID}/artwork/necrotic.png`,
				Pi: `modules/${MODULE_ID}/artwork/pierce.png`,
				Po: `modules/${MODULE_ID}/artwork/poison.png`,
				Py: `modules/${MODULE_ID}/artwork/psychic.png`,
				R: `modules/${MODULE_ID}/artwork/radiant.png`,
				S: `modules/${MODULE_ID}/artwork/slash.png`,
				T: `modules/${MODULE_ID}/artwork/thunder.png`,
			};

			// Evaluate all rolls
			for (const r of rolls) {
				const roll = new Roll(r.formula);
				await roll.evaluate({ async: true }).catch(console.error);
				r.result = roll.total;

				// Send to chat individually
				const fullType = DAMAGE_TYPE_MAP[r.damageType] || r.damageType;
				roll.toMessage({
					speaker: ChatMessage.getSpeaker(),
					flavor: `${fullType} Damage (${r.formula})`,
					rollMode: CONST.DICE_ROLL_MODES.SELF,
				});
			}

			// Build single-line output with icons
			let outputLine = "";
			rolls.forEach((r) => {
				const iconPath = DAMAGE_ICON_MAP[r.damageType] ?? null;
				if (iconPath) {
					outputLine += `<span class="damage-item">${r.result} <img src="${iconPath}" class="damage-icon"></span> `;
				} else {
					outputLine += `<span class="damage-item">${r.result} {${r.damageType}}</span> `;
				}
			});

			// Inject the single-line output into your div
			$(frame).find("#row4-output").html(outputLine.trim());
		});

		return frame;
	}
}

// Make the application class globally available for Foundry's module system
globalThis.DamageDiceApp = DamageDiceApp;

// Initialize the application when Foundry is ready
Hooks.once("ready", () => {
	const app = new DamageDiceApp();
	app.render(true);
});

/**
 * @function resetDice
 * @param {HTMLElement} frame - The application frame element containing the form inputs.
 * @description Resets all dice count inputs to 0, clears the static damage field, and resets the damage type dropdown to the default value (Fire).
 */
function resetDice(frame) {
	const $frame = $(frame);

	// Reset all dice inputs
	const diceTypes = ["d4", "d6", "d8", "d10", "d12", "d20"];
	diceTypes.forEach((dice) => {
		$frame.find(`#${dice}-text`).val(""); // clear dice counts
	});

	// Reset static damage
	$frame.find("#static-damage-text").val("");

	// Reset damage type dropdown to default (e.g., Fire)
	$frame.find("#damage-type").val("Fi");
}
