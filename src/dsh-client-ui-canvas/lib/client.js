window.__ModuleLoader__.load({
	id: "@deepseek-ai/dsh-client-ui-canvas",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		let react = require("react");
		const { jsx, jsxs, Fragment } = react_jsx_runtime;
		const { useState, useRef, useEffect, useCallback } = react;
		//#region styles
		const css = ".dshcv_root{position:relative;box-sizing:border-box;width:100%;height:100%;min-height:0;background:var(--dsw-alias-bg-base);overflow:hidden;user-select:none;touch-action:none;isolation:isolate}.dshcv_surface{position:absolute;inset:0;overflow:hidden;cursor:default}.dshcv_surface[data-panning=true]{cursor:grabbing}.dshcv_surface[data-tool=note],.dshcv_surface[data-tool=text],.dshcv_surface[data-tool=rect],.dshcv_surface[data-tool=ellipse],.dshcv_surface[data-tool=arrow]{cursor:crosshair}.dshcv_world{position:absolute;left:0;top:0;transform-origin:0 0}.dshcv_grid{position:absolute;left:-12000px;top:-12000px;width:24000px;height:24000px;background-image:radial-gradient(var(--dsw-alias-border-l2) 1px,transparent 1.4px);background-size:24px 24px}.dshcv_el{position:absolute;box-sizing:border-box}.dshcv_note{border-radius:3px;box-shadow:0 1px 3px rgba(0,0,0,.16),0 4px 14px rgba(0,0,0,.06);padding:10px 12px;overflow:hidden}.dshcv_noteText{width:100%;height:100%;box-sizing:border-box;white-space:pre-wrap;word-break:break-word;color:#1f2329;font-size:13px;line-height:20px;pointer-events:none}.dshcv_textContent{width:100%;height:100%;box-sizing:border-box;white-space:pre-wrap;word-break:break-word;font-size:15px;line-height:22px;pointer-events:none}.dshcv_sel{outline:1.5px solid var(--dsw-alias-state-business-primary);outline-offset:1px}.dshcv_handle{position:absolute;box-sizing:border-box;width:10px;height:10px;background:#fff;border:1.5px solid var(--dsw-alias-state-business-primary);border-radius:2px;z-index:3}.dshcv_edit{position:absolute;box-sizing:border-box;resize:none;outline:none;border:none;background:transparent;margin:0;padding:0;overflow:hidden;z-index:4;font-family:inherit}.dshcv_toolbar{position:absolute;z-index:5;top:10px;left:50%;transform:translateX(-50%);box-sizing:border-box;display:flex;align-items:center;gap:2px;flex-wrap:wrap;justify-content:center;max-width:calc(100% - 24px);padding:4px;background:var(--dsw-alias-button-floating-fill,var(--dsw-alias-bg-layer-1));border:1px solid var(--dsw-alias-border-l2);border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,.1)}.dshcv_tool{height:26px;padding:0 9px;font-size:12px;line-height:26px;border-radius:6px;border:none;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;font-family:inherit;flex:none}.dshcv_tool:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}.dshcv_tool[data-active=true]{background:var(--dsw-alias-state-business-primary);color:#fff}.dshcv_tool:disabled{opacity:.35;cursor:default}.dshcv_tool[data-armed=true]{background:var(--dsw-alias-state-error-primary,var(--dsw-alias-state-danger-primary));color:#fff}.dshcv_sep{width:1px;height:16px;background:var(--dsw-alias-border-l2);margin:0 4px;flex:none}.dshcv_zoom{min-width:44px;height:26px;padding:0 6px;font-size:12px;line-height:26px;border-radius:6px;text-align:center;color:var(--dsw-alias-label-secondary);flex:none}.dshcv_hint{position:absolute;z-index:4;right:12px;bottom:12px;color:var(--dsw-alias-label-caption);font-size:11px;line-height:16px;text-align:right;pointer-events:none;max-width:70%}.dshcv_empty{position:absolute;z-index:1;inset:0;display:flex;align-items:center;justify-content:center;color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:20px;text-align:center;pointer-events:none;padding:0 24px;white-space:pre-line}.dshcv_design{box-shadow:0 4px 24px rgba(0,0,0,.18);border-radius:10px;overflow:hidden;background:var(--dsw-alias-bg-layer-1)}.dshcv_designBar{display:flex;align-items:center;justify-content:space-between;gap:8px;height:30px;padding:0 6px 0 12px;background:var(--dsw-alias-bg-layer-2);border-bottom:1px solid var(--dsw-alias-border-l2);cursor:grab}.dshcv_designTitle{font-size:11px;color:var(--dsw-alias-label-tertiary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}.dshcv_designBtn{height:20px;padding:0 8px;font-size:11px;line-height:20px;border-radius:5px;border:none;background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-secondary);cursor:pointer;font-family:inherit;flex:none}.dshcv_designBtn:hover{background:var(--dsw-alias-state-business-primary);color:#fff}.dshcv_designStage{position:relative;overflow:hidden;background:var(--dsw-alias-bg-base)}.dshcv_designStage iframe{display:block}";
		const tagId = "@deepseek-ai/dsh-client-ui-canvas/DesignCanvas.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-canvas";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		//#endregion
		//#region locales
		/** `canvas` namespace dictionaries (view tab label + toolbar strings). */
		const NS = "canvas";
		/** Simplified Chinese dictionary (the key-set source of truth). */
		const zh = {
			"view.design": "Design",
			"tool.select": "选择",
			"tool.note": "便签",
			"tool.text": "文本",
			"tool.rect": "矩形",
			"tool.ellipse": "椭圆",
			"tool.arrow": "箭头",
			"tool.design": "设计稿",
			"action.undo": "撤销",
			"action.redo": "重做",
			"action.delete": "删除",
			"action.clear": "清空",
			"action.clearArmed": "确认清空?",
			"action.import": "载入示例",
			"action.importArmed": "确认载入?",
			"action.importHint": "载入示例设计稿（会替换画布当前内容）",
			"action.fit": "适应",
			"action.resetZoom": "重置缩放",
			"zoomOut": "缩小",
			"zoomIn": "放大",
			"hint": "拖拽空白平移 · 滚轮缩放 · 双击编辑文本 · Del 删除 · Ctrl+Z 撤销",
			"empty": "这是一块无限画布\n选择上方工具，拖拽即可创建便签、文本、形状和连线"
		};
		/** English dictionary. */
		const en = {
			"view.design": "Design",
			"tool.select": "Select",
			"tool.note": "Note",
			"tool.text": "Text",
			"tool.rect": "Rect",
			"tool.ellipse": "Ellipse",
			"tool.arrow": "Arrow",
			"tool.design": "Mockup",
			"action.undo": "Undo",
			"action.redo": "Redo",
			"action.delete": "Delete",
			"action.clear": "Clear",
			"action.clearArmed": "Confirm clear?",
			"action.import": "Load sample",
			"action.importArmed": "Confirm load?",
			"action.importHint": "Load the sample UI mockup (replaces the current canvas)",
			"action.fit": "Fit",
			"action.resetZoom": "Reset zoom",
			"zoomOut": "Zoom out",
			"zoomIn": "Zoom in",
			"hint": "Drag empty space to pan · Scroll to zoom · Double-click to edit · Del to delete · Ctrl+Z undo",
			"empty": "An infinite canvas\nPick a tool above and drag to create notes, text, shapes and arrows"
		};
		//#endregion
		//#region helpers
		const NOTE_COLORS = ["#fff3bf", "#ffd8a8", "#ffc9c9", "#d0ebff", "#d3f9d8", "#e5dbff", "#f1e3ff", "#ffe8e8"];
		const MIN_SIZE = 14;
		const HISTORY_LIMIT = 100;
		let uidSeq = 0;
		function uid() {
			uidSeq += 1;
			return "el" + uidSeq.toString(36) + "_" + Math.random().toString(36).slice(2, 8);
		}
		function clamp(v, lo, hi) {
			return Math.min(hi, Math.max(lo, v));
		}
		function distToSegment(p, a, b) {
			const abx = b.x - a.x, aby = b.y - a.y;
			const len2 = abx * abx + aby * aby;
			let t = len2 === 0 ? 0 : ((p.x - a.x) * abx + (p.y - a.y) * aby) / len2;
			t = clamp(t, 0, 1);
			const qx = a.x + t * abx, qy = a.y + t * aby;
			return Math.hypot(p.x - qx, p.y - qy);
		}
		/**
		 * Build a fresh element draft. `fixed` carries identity/random fields so
		 * re-building the draft during a drag keeps the same id and color.
		 */
		function makeDraft(type, start, end, scale, fixed) {
			const id = (fixed && fixed.id) || uid();
			if (type === "arrow") {
				let p1 = start, p2 = end;
				if (Math.hypot(p2.x - p1.x, p2.y - p1.y) < 2 / scale) p2 = { x: p1.x + 120, y: p1.y };
				return { id, type, points: [p1, p2], stroke: "#4e5969", strokeWidth: 2 };
			}
			const x = Math.min(start.x, end.x), y = Math.min(start.y, end.y);
			let w = Math.abs(end.x - start.x), h = Math.abs(end.y - start.y);
			if (w < 4 / scale) w = type === "design" ? 300 : 160;
			if (h < 4 / scale) h = type === "design" ? DESIGN_CHROME + Math.round(DEVICE_H * w / DEVICE_W) : 110;
			const base = { id, type, x, y, w, h };
			switch (type) {
				case "note":
					return { ...base, text: "", color: (fixed && fixed.color) || NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)] };
				case "text":
					return { ...base, text: "", color: "#1f2329", fontSize: 15 };
				case "rect":
					return { ...base, fill: "rgba(255,255,255,.86)", stroke: "#4e5969", strokeWidth: 2 };
				case "ellipse":
					return { ...base, fill: "rgba(255,255,255,.86)", stroke: "#4e5969", strokeWidth: 2 };
				case "design":
					return {
						...base,
						h: DESIGN_CHROME + Math.round(DEVICE_H * base.w / DEVICE_W),
						deviceW: DEVICE_W, deviceH: DEVICE_H,
						title: "UI 设计稿"
					};
				default:
					return base;
			}
		}
		function worldToScreen(vp, p) {
			return { x: p.x * vp.scale + vp.x, y: p.y * vp.scale + vp.y };
		}
		function screenToWorld(vp, p) {
			return { x: (p.x - vp.x) / vp.scale, y: (p.y - vp.y) / vp.scale };
		}
		/** Linear elements (arrows and plain lines) share geometry: two world-space points. */
		function isLinear(type) {
			return type === "arrow" || type === "line";
		}
		function screenRect(el, vp) {
			if (isLinear(el.type)) {
				const a = worldToScreen(vp, el.points[0]);
				const b = worldToScreen(vp, el.points[1]);
				return { left: Math.min(a.x, b.x), top: Math.min(a.y, b.y), right: Math.max(a.x, b.x), bottom: Math.max(a.y, b.y) };
			}
			const tl = worldToScreen(vp, { x: el.x, y: el.y });
			const br = worldToScreen(vp, { x: el.x + el.w, y: el.y + el.h });
			return { left: tl.x, top: tl.y, right: br.x, bottom: br.y };
		}
		function hitTest(elements, vp, spt) {
			for (let i = elements.length - 1; i >= 0; i--) {
				const el = elements[i];
				if (isLinear(el.type)) {
					const a = worldToScreen(vp, el.points[0]);
					const b = worldToScreen(vp, el.points[1]);
					if (distToSegment(spt, a, b) <= 8) return el;
				} else {
					const r = screenRect(el, vp);
					if (spt.x >= r.left - 2 && spt.x <= r.right + 2 && spt.y >= r.top - 2 && spt.y <= r.bottom + 2) return el;
				}
			}
			return null;
		}
		const HANDLE_POINTS = {
			nw: [0, 0], n: [0.5, 0], ne: [1, 0], e: [1, 0.5],
			se: [1, 1], s: [0.5, 1], sw: [0, 1], w: [0, 0.5]
		};
		const HANDLE_CURSOR = {
			nw: "nwse-resize", se: "nwse-resize", ne: "nesw-resize", sw: "nesw-resize",
			n: "ns-resize", s: "ns-resize", e: "ew-resize", w: "ew-resize",
			start: "move", end: "move"
		};
		function hitHandle(el, vp, spt, scale) {
			const r = screenRect(el, vp);
			if (isLinear(el.type)) {
				const a = worldToScreen(vp, el.points[0]);
				const b = worldToScreen(vp, el.points[1]);
				const hit = (p) => Math.abs(spt.x - p.x) <= 7 && Math.abs(spt.y - p.y) <= 7;
				if (hit(a)) return "start";
				if (hit(b)) return "end";
				return null;
			}
			const hs = Math.max(6, 10 / scale);
			if (el.type === "design") {
				// mockups keep a fixed device ratio: only horizontal resize handles
				const hitSide = (fx) => {
					const hx = r.left + (r.right - r.left) * fx;
					const hy = r.top + (r.bottom - r.top) * 0.5;
					return Math.abs(spt.x - hx) <= hs && Math.abs(spt.y - hy) <= hs;
				};
				if (hitSide(0)) return "w";
				if (hitSide(1)) return "e";
				return null;
			}
			for (const name of Object.keys(HANDLE_POINTS)) {
				const [fx, fy] = HANDLE_POINTS[name];
				const hx = r.left + (r.right - r.left) * fx;
				const hy = r.top + (r.bottom - r.top) * fy;
				if (Math.abs(spt.x - hx) <= hs && Math.abs(spt.y - hy) <= hs) return name;
			}
			return null;
		}
		function applyResize(origin, handle, dx, dy) {
			let { x, y, w, h } = origin;
			switch (handle) {
				case "e": w = origin.w + dx; break;
				case "w": x = origin.x + dx; w = origin.w - dx; break;
				case "s": h = origin.h + dy; break;
				case "n": y = origin.y + dy; h = origin.h - dy; break;
				case "se": w = origin.w + dx; h = origin.h + dy; break;
				case "sw": x = origin.x + dx; w = origin.w - dx; h = origin.h + dy; break;
				case "ne": w = origin.w + dx; y = origin.y + dy; h = origin.h - dy; break;
				case "nw": x = origin.x + dx; y = origin.y + dy; w = origin.w - dx; h = origin.h - dy; break;
				default: break;
			}
			if (w < MIN_SIZE) {
				if (handle.indexOf("w") !== -1) x = origin.x + origin.w - MIN_SIZE;
				w = MIN_SIZE;
			}
			if (h < MIN_SIZE) {
				if (handle.indexOf("n") !== -1) y = origin.y + origin.h - MIN_SIZE;
				h = MIN_SIZE;
			}
			return { x, y, w, h };
		}
		function bboxOf(elements) {
			let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
			for (const el of elements) {
				if (isLinear(el.type)) {
					for (const p of el.points) {
						minX = Math.min(minX, p.x); minY = Math.min(minY, p.y);
						maxX = Math.max(maxX, p.x); maxY = Math.max(maxY, p.y);
					}
				} else {
					minX = Math.min(minX, el.x); minY = Math.min(minY, el.y);
					maxX = Math.max(maxX, el.x + el.w); maxY = Math.max(maxY, el.y + el.h);
				}
			}
			return { minX, minY, maxX, maxY };
		}
		//#endregion
		//#region blueprint: iPhone back 2D technical drawing
		/** Blueprint stroke color (readable on light and dark surfaces). */
		const BLUE = "#2f7fe0";
		/**
		 * Auto-imported demo drawing: an iPhone back 2D technical drawing
		 * (4x scale; world units ≈ mm × 4). Coordinates are laid out around the
		 * body rect (0,0,286,587).
		 */
		const BLUEPRINT = [
			// ---- sheet frame + title block ----
			{ type: "rect", x: -160, y: -90, w: 540, h: 790, radius: 16, stroke: BLUE, strokeWidth: 2, fill: "rgba(255,255,255,0.12)" },
			{ type: "text", x: -17, y: -78, w: 320, h: 26, text: "iPhone 15 Pro 背面 · 2D 图纸", fontSize: 17, align: "center", color: BLUE },
			{ type: "text", x: 47, y: 663, w: 192, h: 22, text: "比例 4:1 · 单位 mm · 钛金属", fontSize: 12, align: "center", color: BLUE },
			// ---- body ----
			{ type: "rect", x: 0, y: 0, w: 286, h: 587, radius: 55, stroke: BLUE, strokeWidth: 3, fill: "rgba(255,255,255,0.45)" },
			// ---- antenna slots ----
			{ type: "line", points: [{ x: 40, y: 150 }, { x: 246, y: 150 }], stroke: BLUE, strokeWidth: 2 },
			{ type: "line", points: [{ x: 40, y: 430 }, { x: 246, y: 430 }], stroke: BLUE, strokeWidth: 2 },
			// ---- side buttons ----
			{ type: "rect", x: -10, y: 106, w: 10, h: 20, radius: 4, stroke: BLUE, strokeWidth: 2.5 },
			{ type: "rect", x: -10, y: 140, w: 10, h: 34, radius: 4, stroke: BLUE, strokeWidth: 2.5 },
			{ type: "rect", x: -10, y: 180, w: 10, h: 34, radius: 4, stroke: BLUE, strokeWidth: 2.5 },
			{ type: "rect", x: 286, y: 170, w: 10, h: 64, radius: 4, stroke: BLUE, strokeWidth: 2.5 },
			// ---- USB-C ----
			{ type: "rect", x: 130, y: 587, w: 26, h: 8, radius: 4, stroke: BLUE, strokeWidth: 2.5 },
			// ---- camera island ----
			{ type: "rect", x: 30, y: 36, w: 108, h: 108, radius: 42, stroke: BLUE, strokeWidth: 3, fill: "rgba(255,255,255,0.35)" },
			{ type: "ellipse", x: 53, y: 61, w: 34, h: 34, stroke: BLUE, strokeWidth: 3 },
			{ type: "ellipse", x: 63, y: 71, w: 14, h: 14, stroke: BLUE, strokeWidth: 2 },
			{ type: "ellipse", x: 67, y: 75, w: 6, h: 6, fill: BLUE, stroke: BLUE, strokeWidth: 1 },
			{ type: "ellipse", x: 95, y: 61, w: 34, h: 34, stroke: BLUE, strokeWidth: 3 },
			{ type: "ellipse", x: 105, y: 71, w: 14, h: 14, stroke: BLUE, strokeWidth: 2 },
			{ type: "ellipse", x: 109, y: 75, w: 6, h: 6, fill: BLUE, stroke: BLUE, strokeWidth: 1 },
			{ type: "ellipse", x: 53, y: 103, w: 34, h: 34, stroke: BLUE, strokeWidth: 3 },
			{ type: "ellipse", x: 63, y: 113, w: 14, h: 14, stroke: BLUE, strokeWidth: 2 },
			{ type: "ellipse", x: 67, y: 117, w: 6, h: 6, fill: BLUE, stroke: BLUE, strokeWidth: 1 },
			{ type: "ellipse", x: 100, y: 108, w: 24, h: 24, stroke: BLUE, strokeWidth: 3 },
			{ type: "ellipse", x: 108, y: 116, w: 8, h: 8, stroke: BLUE, strokeWidth: 2 },
			{ type: "ellipse", x: 152, y: 44, w: 12, h: 12, stroke: BLUE, strokeWidth: 2.5 },
			{ type: "ellipse", x: 155, y: 47, w: 6, h: 6, fill: BLUE, stroke: BLUE, strokeWidth: 1 },
			// ---- apple logo ----
			{ type: "ellipse", x: 116, y: 268, w: 54, h: 64, stroke: BLUE, strokeWidth: 3 },
			{ type: "ellipse", x: 133, y: 252, w: 24, h: 14, stroke: BLUE, strokeWidth: 2.5 },
			{ type: "line", points: [{ x: 143, y: 258 }, { x: 143, y: 244 }], stroke: BLUE, strokeWidth: 2.5 },
			{ type: "text", x: 113, y: 344, w: 60, h: 24, text: "iPhone", fontSize: 18, align: "center", color: BLUE },
			// ---- dimensions ----
			{ type: "line", points: [{ x: 0, y: 0 }, { x: 0, y: -16 }], stroke: BLUE, strokeWidth: 1.5 },
			{ type: "line", points: [{ x: 286, y: 0 }, { x: 286, y: -16 }], stroke: BLUE, strokeWidth: 1.5 },
			{ type: "arrow", points: [{ x: 0, y: -26 }, { x: 286, y: -26 }], stroke: BLUE, strokeWidth: 2 },
			{ type: "text", x: 116, y: -48, w: 54, h: 20, text: "71.5", fontSize: 14, align: "center", color: BLUE },
			{ type: "line", points: [{ x: 286, y: 0 }, { x: 302, y: 0 }], stroke: BLUE, strokeWidth: 1.5 },
			{ type: "line", points: [{ x: 286, y: 587 }, { x: 302, y: 587 }], stroke: BLUE, strokeWidth: 1.5 },
			{ type: "arrow", points: [{ x: 314, y: 0 }, { x: 314, y: 587 }], stroke: BLUE, strokeWidth: 2 },
			{ type: "text", x: 322, y: 280, w: 44, h: 20, text: "146.7", fontSize: 14, align: "center", color: BLUE },
			{ type: "arrow", points: [{ x: 30, y: 158 }, { x: 138, y: 158 }], stroke: BLUE, strokeWidth: 2 },
			{ type: "text", x: 66, y: 168, w: 36, h: 22, text: "108", fontSize: 13, align: "center", color: BLUE },
			// ---- callouts ----
			{ type: "text", x: 175, y: 14, w: 76, h: 20, text: "相机模组", fontSize: 13, color: BLUE },
			{ type: "line", points: [{ x: 175, y: 34 }, { x: 128, y: 50 }], stroke: BLUE, strokeWidth: 1.5 },
			{ type: "ellipse", x: 125, y: 47, w: 6, h: 6, fill: BLUE, stroke: BLUE, strokeWidth: 1 },
			{ type: "text", x: 175, y: 296, w: 76, h: 20, text: "Apple 标志", fontSize: 13, color: BLUE },
			{ type: "line", points: [{ x: 175, y: 316 }, { x: 146, y: 304 }], stroke: BLUE, strokeWidth: 1.5 },
			{ type: "ellipse", x: 143, y: 301, w: 6, h: 6, fill: BLUE, stroke: BLUE, strokeWidth: 1 },
			{ type: "text", x: -120, y: 150, w: 76, h: 20, text: "侧边按键", fontSize: 13, color: BLUE },
			{ type: "line", points: [{ x: -120, y: 170 }, { x: -18, y: 158 }], stroke: BLUE, strokeWidth: 1.5 },
			{ type: "ellipse", x: -21, y: 155, w: 6, h: 6, fill: BLUE, stroke: BLUE, strokeWidth: 1 },
			{ type: "text", x: 60, y: 614, w: 76, h: 20, text: "USB-C 接口", fontSize: 13, color: BLUE },
			{ type: "line", points: [{ x: 60, y: 634 }, { x: 128, y: 600 }], stroke: BLUE, strokeWidth: 1.5 },
			{ type: "ellipse", x: 125, y: 597, w: 6, h: 6, fill: BLUE, stroke: BLUE, strokeWidth: 1 },
			{ type: "text", x: 175, y: 420, w: 76, h: 20, text: "天线开槽", fontSize: 13, color: BLUE },
			{ type: "line", points: [{ x: 175, y: 440 }, { x: 200, y: 430 }], stroke: BLUE, strokeWidth: 1.5 },
			{ type: "ellipse", x: 197, y: 427, w: 6, h: 6, fill: BLUE, stroke: BLUE, strokeWidth: 1 }
		];
		//#endregion
		//#region UI design mockup: live HTML/CSS preview on the canvas
		/** Device frame used for design mockups (design units; the canvas scales it). */
		const DEVICE_W = 375;
		const DEVICE_H = 812;
		/** Height of the design element chrome bar (px, not scaled). */
		const DESIGN_CHROME = 30;
		/**
		 * The current UI design mockup: a complete HTML document rendered inside an
		 * iframe on the canvas. Edit this string to redesign; HMR repaints the
		 * canvas automatically. The canvas element never persists this content —
		 * it always renders the latest build.
		 */
		const DESIGN_HTML = `<!doctype html><html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box;-webkit-font-smoothing:antialiased}
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;background:#0b0f19;color:#e9edf6;width:375px;height:812px;overflow:hidden}
.app{position:relative;width:375px;height:812px;background:linear-gradient(180deg,#101828 0%,#0b0f19 46%);display:flex;flex-direction:column;padding:0 20px}
.status{height:44px;display:flex;align-items:center;justify-content:space-between;font-size:13px;font-weight:600;color:#c7cede}
.header{display:flex;align-items:center;justify-content:space-between;margin-top:14px}
.header .hi{font-size:12px;color:#8b95a9;letter-spacing:.4px}
.header .name{font-size:22px;font-weight:700;margin-top:3px}
.avatar{width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#6ee7ff,#7c6cff);display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:700;color:#0b0f19}
.steps{margin-top:22px;background:linear-gradient(135deg,rgba(124,108,255,.22),rgba(110,231,255,.12));border:1px solid rgba(124,108,255,.35);border-radius:20px;padding:20px;display:flex;align-items:center;gap:18px;position:relative;overflow:hidden}
.steps .ring{flex:none}
.steps .num{font-size:38px;font-weight:800;letter-spacing:-1px;background:linear-gradient(90deg,#8f7bff,#5ce1ff);-webkit-background-clip:text;background-clip:text;color:transparent}
.steps .label{font-size:12px;color:#8b95a9;margin-top:2px}
.steps .pct{position:absolute;top:14px;right:16px;font-size:11px;color:#7c6cff;background:rgba(124,108,255,.18);padding:3px 8px;border-radius:99px}
.metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:14px}
.metric{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:14px 12px}
.metric .ic{font-size:17px}
.metric .v{font-size:19px;font-weight:700;margin-top:8px}
.metric .k{font-size:10px;color:#8b95a9;margin-top:2px}
.metric.hr .v{color:#ff7a7a}.metric.sl .v{color:#7ee0a3}.metric.kc .v{color:#ffcf6b}
.chart{margin-top:18px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:18px;padding:16px 16px 12px}
.chart .t{font-size:13px;font-weight:600}
.chart .s{font-size:10px;color:#8b95a9;margin-top:2px}
.bars{display:flex;align-items:flex-end;gap:10px;height:120px;margin-top:14px}
.bar{flex:1;display:flex;flex-direction:column;align-items:center;gap:6px}
.bar i{width:100%;max-width:26px;border-radius:8px 8px 4px 4px;background:linear-gradient(180deg,#7c6cff,#3f3aa0)}
.bar.d1 i{height:42%}.bar.d2 i{height:64%}.bar.d3 i{height:52%}.bar.d4 i{height:88%}.bar.d5 i{height:70%}.bar.d6 i{height:96%}.bar.d7 i{height:58%}
.bar.active i{background:linear-gradient(180deg,#5ce1ff,#2f7fe0)}
.bar b{font-size:10px;color:#8b95a9;font-weight:500}
.tabs{margin-top:auto;display:flex;justify-content:space-around;padding:12px 0 8px;border-top:1px solid rgba(255,255,255,.07)}
.tab{display:flex;flex-direction:column;align-items:center;gap:3px;font-size:10px;color:#8b95a9}
.tab.on{color:#6ee7ff}
.tab .dot{width:20px;height:20px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:12px}
.tab.on .dot{background:rgba(110,231,255,.16)}
</style></head><body><div class="app">
<div class="status"><span>9:41</span><span>●●● ▍</span></div>
<div class="header"><div><div class="hi">GOOD MORNING</div><div class="name">早上好，Alex 👋</div></div><div class="avatar">A</div></div>
<div class="steps">
  <svg class="ring" width="84" height="84" viewBox="0 0 84 84"><circle cx="42" cy="42" r="36" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="7"/><circle cx="42" cy="42" r="36" fill="none" stroke="url(#g)" stroke-width="7" stroke-linecap="round" stroke-dasharray="226" stroke-dashoffset="52" transform="rotate(-90 42 42)"/><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7c6cff"/><stop offset="1" stop-color="#5ce1ff"/></linearGradient></defs></svg>
  <div><div class="num">8,642</div><div class="label">今日步数 · 目标 1 万</div></div>
  <div class="pct">86%</div>
</div>
<div class="metrics">
  <div class="metric hr"><div class="ic">❤️</div><div class="v">72</div><div class="k">心率 bpm</div></div>
  <div class="metric sl"><div class="ic">😴</div><div class="v">7:42</div><div class="k">睡眠</div></div>
  <div class="metric kc"><div class="ic">🔥</div><div class="v">512</div><div class="k">卡路里 kcal</div></div>
</div>
<div class="chart"><div class="t">本周活动</div><div class="s">较上周 +12%</div><div class="bars">
  <div class="bar d1"><i></i><b>一</b></div><div class="bar d2"><i></i><b>二</b></div><div class="bar d3"><i></i><b>三</b></div><div class="bar d4 active"><i></i><b>四</b></div><div class="bar d5"><i></i><b>五</b></div><div class="bar d6"><i></i><b>六</b></div><div class="bar d7"><i></i><b>日</b></div>
</div></div>
<div class="tabs"><div class="tab on"><div class="dot">⌂</div>首页</div><div class="tab"><div class="dot">▷</div>运动</div><div class="tab"><div class="dot">▤</div>报告</div><div class="tab"><div class="dot">●</div>我的</div></div>
</div></body></html>`;
		/**
		 * Auto-imported demo composition: one live design mockup plus a hint card.
		 * World units are canvas pixels; the mockup is scaled from its 375x812
		 * device frame.
		 */
		const DESIGN_DEMO = [
			{ type: "design", x: 48, y: 160, w: 300, h: DESIGN_CHROME + Math.round(DEVICE_H * 300 / DEVICE_W), deviceW: DEVICE_W, deviceH: DEVICE_H, title: "示例 · 健康 App 首页（双击进入预览）" },
			{ type: "text", x: 388, y: 172, w: 260, h: 30, text: "UI 设计稿 · 所见即所得", fontSize: 18, color: "#2f7fe0" },
			{ type: "text", x: 388, y: 208, w: 280, h: 66, text: "这是真实 HTML/CSS 渲染的效果，不是示意图。双击设计稿可点击交互，拖动标题栏移动，拖动左右边缘缩放。", fontSize: 13, color: "#8b95a9" }
		];
		//#endregion
		//#region element renderers
		function NoteEl({ el, selected, editing, editDraft, onDoubleClick, onEditInput, onEditKeyDown, onEditBlur }) {
			return jsx("div", {
				key: el.id,
				className: "dshcv_el dshcv_note" + (selected ? " dshcv_sel" : ""),
				style: { left: el.x, top: el.y, width: el.w, height: el.h, background: el.color },
				onDoubleClick: (e) => onDoubleClick(e, el),
				children: editing ? jsx("textarea", {
					className: "dshcv_edit",
					style: { left: 0, top: 0, width: el.w, height: el.h, padding: "10px 12px", color: "#1f2329", fontSize: 13, lineHeight: "20px", whiteSpace: "pre-wrap", wordBreak: "break-word", borderRadius: 3 },
					value: editDraft,
					autoFocus: true,
					onFocus: (e) => { e.currentTarget.select(); },
					onChange: (e) => onEditInput(e.currentTarget.value),
					onKeyDown: (e) => onEditKeyDown(e),
					onBlur: (e) => onEditBlur(e),
					onPointerDown: (e) => e.stopPropagation()
				}) : jsx("div", { className: "dshcv_noteText", children: el.text })
			});
		}
		function TextEl({ el, selected, editing, editDraft, onDoubleClick, onEditInput, onEditKeyDown, onEditBlur }) {
			return jsx("div", {
				key: el.id,
				className: "dshcv_el" + (selected ? " dshcv_sel" : ""),
				style: { left: el.x, top: el.y, width: el.w, height: el.h, background: "transparent" },
				onDoubleClick: (e) => onDoubleClick(e, el),
				children: editing ? jsx("textarea", {
					className: "dshcv_edit",
					style: { left: 0, top: 0, width: el.w, height: el.h, color: el.color, fontSize: el.fontSize ?? 15, lineHeight: "22px", whiteSpace: "pre-wrap", wordBreak: "break-word" },
					value: editDraft,
					autoFocus: true,
					onFocus: (e) => { e.currentTarget.select(); },
					onChange: (e) => onEditInput(e.currentTarget.value),
					onKeyDown: (e) => onEditKeyDown(e),
					onBlur: (e) => onEditBlur(e),
					onPointerDown: (e) => e.stopPropagation()
				}) : jsx("div", { className: "dshcv_textContent", style: { color: el.color, fontSize: el.fontSize ?? 15, textAlign: el.align ?? "left" }, children: el.text })
			});
		}
		function ShapeEl({ el, selected, onDoubleClick }) {
			const common = {
				left: el.x, top: el.y, width: el.w, height: el.h,
				background: el.fill, border: `${el.strokeWidth}px solid ${el.stroke}`
			};
			if (el.type === "ellipse") {
				return jsx("div", { key: el.id, className: "dshcv_el" + (selected ? " dshcv_sel" : ""), style: { ...common, borderRadius: "50%" }, onDoubleClick: (e) => onDoubleClick(e, el) });
			}
			return jsx("div", { key: el.id, className: "dshcv_el" + (selected ? " dshcv_sel" : ""), style: { ...common, borderRadius: el.radius ?? 0 }, onDoubleClick: (e) => onDoubleClick(e, el) });
		}
		function ArrowEl({ el, selected }) {
			const p1 = el.points[0], p2 = el.points[1];
			const minX = Math.min(p1.x, p2.x), minY = Math.min(p1.y, p2.y);
			const w = Math.abs(p2.x - p1.x), h = Math.abs(p2.y - p1.y);
			const len = Math.max(0.001, Math.hypot(p2.x - p1.x, p2.y - p1.y));
			const ux = (p2.x - p1.x) / len, uy = (p2.y - p1.y) / len;
			const head = [];
			if (el.type === "arrow") {
				const hs = 10;
				const bx = p2.x - ux * hs, by = p2.y - uy * hs;
				const nx = -uy, ny = ux;
				const h1 = { x: bx + nx * hs * 0.45, y: by + ny * hs * 0.45 };
				const h2 = { x: bx - nx * hs * 0.45, y: by - ny * hs * 0.45 };
				head.push([p2, h1, h2].map((p) => `${p.x - minX},${p.y - minY}`).join(" "));
			}
			return jsx("div", {
				key: el.id,
				className: "dshcv_el" + (selected ? " dshcv_sel" : ""),
				style: { left: minX, top: minY, width: Math.max(w, 1), height: Math.max(h, 1), pointerEvents: "none" },
				children: jsxs("svg", {
					width: Math.max(w, 1), height: Math.max(h, 1), style: { display: "block", overflow: "visible" },
					children: [
						jsx("line", { x1: p1.x - minX, y1: p1.y - minY, x2: p2.x - minX, y2: p2.y - minY, stroke: el.stroke, strokeWidth: el.strokeWidth, strokeLinecap: "round" }),
						head.map((pts, i) => jsx("polygon", { key: i, points: pts, fill: el.stroke }))
					]
				})
			});
		}
		//#endregion
		//#region design mockup renderer
		/**
		 * Live HTML design mockup: an iframe rendering the latest DESIGN_HTML at
		 * the element's device size, scaled into the canvas element box. The
		 * iframe ignores pointer events unless the element is in preview mode.
		 */
		function DesignEl({ el, selected, preview, onDoubleClick, onTogglePreview }) {
			const scale = el.w / el.deviceW;
			const stageH = Math.round(el.deviceH * scale);
			return jsxs("div", {
				key: el.id,
				className: "dshcv_el dshcv_design" + (selected ? " dshcv_sel" : ""),
				style: { left: el.x, top: el.y, width: el.w, height: el.h },
				onDoubleClick: (e) => onDoubleClick(e, el),
				children: [
					jsxs("div", { className: "dshcv_designBar", children: [
						jsx("span", { className: "dshcv_designTitle", children: el.title }),
						jsx("button", {
							type: "button",
							className: "dshcv_designBtn",
							onPointerDown: (e) => e.stopPropagation(),
							onClick: (e) => { e.stopPropagation(); onTogglePreview(el); },
							children: preview ? "退出预览" : "预览"
						})
					] }),
					jsx("div", { className: "dshcv_designStage", style: { width: el.w, height: stageH }, children:
						jsx("iframe", {
							srcDoc: DESIGN_HTML,
							title: el.title,
							style: { width: el.deviceW, height: el.deviceH, border: "none", transform: "scale(" + scale + ")", transformOrigin: "0 0", pointerEvents: preview ? "auto" : "none", background: "#0b0f19" }
						})
					})
				]
			});
		}
		//#endregion
		//#region toolbar
		function Toolbar({ t, tool, setTool, canUndo, canRedo, onUndo, onRedo, zoom, onZoomIn, onZoomOut, onResetZoom, onFit, onDelete, onClear, onImport, armClear, armImport, hasSelection, hasElements }) {
			const tools = [
				["select", t("tool.select")],
				["note", t("tool.note")],
				["text", t("tool.text")],
				["rect", t("tool.rect")],
				["ellipse", t("tool.ellipse")],
				["arrow", t("tool.arrow")],
				["design", t("tool.design")]
			];
			return jsxs("div", {
				className: "dshcv_toolbar",
				children: [
					tools.map(([id, label]) => jsx("button", {
						type: "button",
						key: id,
						className: "dshcv_tool",
						"data-active": tool === id || undefined,
						onClick: () => setTool(id),
						children: label
					})),
					jsx("div", { className: "dshcv_sep" }),
					jsx("button", { type: "button", className: "dshcv_tool", disabled: !canUndo, onClick: onUndo, title: "Ctrl+Z", children: t("action.undo") }),
					jsx("button", { type: "button", className: "dshcv_tool", disabled: !canRedo, onClick: onRedo, title: "Ctrl+Shift+Z", children: t("action.redo") }),
					jsx("div", { className: "dshcv_sep" }),
					jsx("button", { type: "button", className: "dshcv_tool", onClick: onZoomOut, title: t("zoomOut"), children: "−" }),
					jsx("button", { type: "button", className: "dshcv_zoom", onClick: onResetZoom, title: t("action.resetZoom"), children: Math.round(zoom * 100) + "%" }),
					jsx("button", { type: "button", className: "dshcv_tool", onClick: onZoomIn, title: t("zoomIn"), children: "+" }),
					jsx("button", { type: "button", className: "dshcv_tool", onClick: onFit, children: t("action.fit") }),
					jsx("div", { className: "dshcv_sep" }),
					jsx("button", { type: "button", className: "dshcv_tool", disabled: !hasSelection, onClick: onDelete, title: "Del", children: t("action.delete") }),
					jsx("button", { type: "button", className: "dshcv_tool", "data-armed": armClear || undefined, disabled: !hasElements, onClick: onClear, children: armClear ? t("action.clearArmed") : t("action.clear") }),
					jsx("div", { className: "dshcv_sep" }),
					jsx("button", { type: "button", className: "dshcv_tool", "data-armed": armImport || undefined, onClick: onImport, title: t("action.importHint"), children: armImport ? t("action.importArmed") : t("action.import") })
				]
			});
		}
		//#endregion
		//#region DesignCanvasView
		function DesignCanvasView({ sessionId, t }) {
			const [tool, setTool] = useState("select");
			const [elements, setElements] = useState([]);
			const [selectedId, setSelectedId] = useState(null);
			const [viewport, setViewport] = useState({ x: 24, y: 24, scale: 1 });
			const [history, setHistory] = useState({ past: [], future: [] });
			const [editing, setEditing] = useState(null);
			const [editDraft, setEditDraft] = useState("");
			const [armClear, setArmClear] = useState(false);
			const [armImport, setArmImport] = useState(false);
			const [previewId, setPreviewId] = useState(null);
			const [panning, setPanning] = useState(false);
			const surfaceRef = useRef(null);
			const dragRef = useRef(null);
			const spaceRef = useRef(false);
			const elementsRef = useRef(elements);
			const historyRef = useRef(history);
			const selectedRef = useRef(selectedId);
			const viewportRef = useRef(viewport);
			const editingRef = useRef(editing);
			const toolRef = useRef(tool);
			const editDraftRef = useRef(editDraft);
			elementsRef.current = elements;
			historyRef.current = history;
			selectedRef.current = selectedId;
			viewportRef.current = viewport;
			editingRef.current = editing;
			toolRef.current = tool;
			editDraftRef.current = editDraft;
			const storageKey = "dsh.canvas.v1." + (sessionId ?? "none");

			const commitElements = useCallback((prev, next) => {
				setElements(next);
				setHistory((h) => ({ past: [...h.past.slice(-(HISTORY_LIMIT - 1)), prev], future: [] }));
			}, []);
			const commitElementsRef = useRef(commitElements);
			commitElementsRef.current = commitElements;

			const stopEditing = useCallback((commit) => {
				const cur = editingRef.current;
				if (cur === null) return;
				if (commit) {
					const id = cur.id;
					const text = editDraftRef.current;
					const prev = elementsRef.current;
					let changed = false;
					const next = prev.map((el) => {
						if (el.id !== id) return el;
						const updated = { ...el, text };
						if (updated.text === el.text) return el;
						changed = true;
						return updated;
					});
					if (changed) commitElementsRef.current(prev, next);
				}
				setEditing(null);
			}, []);
			const stopEditingRef = useRef(stopEditing);
			stopEditingRef.current = stopEditing;

			const startEditingEl = useCallback((el) => {
				if (!el || (el.type !== "note" && el.type !== "text")) return;
				setEditDraft(el.text ?? "");
				setEditing({ id: el.id });
			}, []);
			const startEditingElRef = useRef(startEditingEl);
			startEditingElRef.current = startEditingEl;

			const undo = useCallback(() => {
				const h = historyRef.current;
				if (h.past.length === 0) return;
				const prev = h.past[h.past.length - 1];
				setElements(prev);
				setSelectedId(null);
				setEditing(null);
				setHistory({ past: h.past.slice(0, -1), future: [elementsRef.current, ...h.future].slice(0, HISTORY_LIMIT) });
			}, []);
			const redo = useCallback(() => {
				const h = historyRef.current;
				if (h.future.length === 0) return;
				const next = h.future[0];
				setElements(next);
				setSelectedId(null);
				setEditing(null);
				setHistory({ past: [...h.past, elementsRef.current].slice(-HISTORY_LIMIT), future: h.future.slice(1) });
			}, []);
			const deleteSelected = useCallback(() => {
				const id = selectedRef.current;
				if (!id) return;
				const prev = elementsRef.current;
				const next = prev.filter((el) => el.id !== id);
				if (next.length === prev.length) return;
				commitElementsRef.current(prev, next);
				setSelectedId(null);
			}, []);
			const clearAll = useCallback(() => {
				const prev = elementsRef.current;
				if (prev.length === 0) return;
				commitElementsRef.current(prev, []);
				setSelectedId(null);
				setArmClear(false);
			}, []);
			/** Import the built-in blueprint drawing (replaces whatever is on the canvas). */
			const importBlueprint = useCallback(() => {
				const prev = elementsRef.current;
				const next = DESIGN_DEMO.map((el) => ({ ...el, id: uid() }));
				if (next.length === 0) return;
				commitElementsRef.current(prev, next);
				setSelectedId(null);
				setArmClear(false);
				setArmImport(false);
				importedRef.current = true;
				const surface = surfaceRef.current;
				if (surface) {
					const rect = surface.getBoundingClientRect();
					const b = bboxOf(next);
					const bw = Math.max(b.maxX - b.minX, 1), bh = Math.max(b.maxY - b.minY, 1);
					const s = clamp(Math.min(rect.width / (bw + 80), rect.height / (bh + 80), 1.5), 0.15, 2);
					setViewport({ x: (rect.width - bw * s) / 2 - b.minX * s, y: (rect.height - bh * s) / 2 - b.minY * s + 46, scale: s });
				}
			}, []);
			const importedRef = useRef(false);
			const importBlueprintRef = useRef(importBlueprint);
			importBlueprintRef.current = importBlueprint;
			const undoRef = useRef(undo);
			undoRef.current = undo;
			const redoRef = useRef(redo);
			redoRef.current = redo;
			const deleteSelectedRef = useRef(deleteSelected);
			deleteSelectedRef.current = deleteSelected;

			// ---- load per session (declared before the save effect so a session
			// switch never writes the previous session's elements under the new key)
			useEffect(() => {
				let loaded = [];
				try {
					const raw = localStorage.getItem(storageKey);
					if (raw) {
						const data = JSON.parse(raw);
						if (Array.isArray(data.elements)) loaded = data.elements;
					}
				} catch (_) { /* storage unavailable: start empty */ }
				setElements(loaded);
				setSelectedId(null);
				setEditing(null);
				setHistory({ past: [], future: [] });
				setTool("select");
				setArmClear(false);
				setArmImport(false);
				if (loaded.length === 0) {
					if (DESIGN_DEMO.length > 0 && !importedRef.current) importBlueprintRef.current();
					else setViewport({ x: 24, y: 24, scale: 1 });
				} else {
					const surface = surfaceRef.current;
					if (surface) {
						const rect = surface.getBoundingClientRect();
						const b = bboxOf(loaded);
						const bw = Math.max(b.maxX - b.minX, 1), bh = Math.max(b.maxY - b.minY, 1);
						const s = clamp(Math.min(rect.width / (bw + 80), rect.height / (bh + 80), 1.5), 0.15, 2);
						setViewport({ x: (rect.width - bw * s) / 2 - b.minX * s, y: (rect.height - bh * s) / 2 - b.minY * s + 46, scale: s });
					}
				}
				// eslint-disable-next-line react-hooks/exhaustive-deps
			}, [storageKey]);

			// ---- persist on every change
			useEffect(() => {
				try { localStorage.setItem(storageKey, JSON.stringify({ elements })); } catch (_) { /* ignore */ }
			}, [elements, storageKey]);

			// ---- save on unmount
			useEffect(() => {
				return () => {
					try { localStorage.setItem(storageKey, JSON.stringify({ elements: elementsRef.current })); } catch (_) { /* ignore */ }
				};
				// eslint-disable-next-line react-hooks/exhaustive-deps
			}, [storageKey]);

			// ---- keyboard
			useEffect(() => {
				const onKeyDown = (e) => {
					const target = e.target;
					const inField = target instanceof HTMLElement && (target.tagName === "TEXTAREA" || target.tagName === "INPUT" || target.isContentEditable);
					if (e.code === "Space" && !inField) {
						spaceRef.current = true;
						e.preventDefault();
						return;
					}
					if (e.key === "Escape") {
						if (editingRef.current !== null) { stopEditingRef.current(false); return; }
						const drag = dragRef.current;
						if (drag !== null) {
							if (drag.mode === "create") {
								setElements((prev) => prev.filter((el) => el.id !== drag.draft.id));
							}
							dragRef.current = null;
							setPanning(false);
							return;
						}
						if (selectedRef.current !== null) { setSelectedId(null); return; }
						if (toolRef.current !== "select") setTool("select");
						return;
					}
					if (inField) return;
					if (e.key === "Delete" || e.key === "Backspace") { deleteSelectedRef.current(); return; }
					const mod = e.ctrlKey || e.metaKey;
					if (mod && e.key.toLowerCase() === "z") {
						e.preventDefault();
						if (e.shiftKey) redoRef.current();
						else undoRef.current();
						return;
					}
					if (mod && e.key.toLowerCase() === "y") {
						e.preventDefault();
						redoRef.current();
					}
				};
				const onKeyUp = (e) => {
					if (e.code === "Space") spaceRef.current = false;
				};
				window.addEventListener("keydown", onKeyDown);
				window.addEventListener("keyup", onKeyUp);
				return () => {
					window.removeEventListener("keydown", onKeyDown);
					window.removeEventListener("keyup", onKeyUp);
				};
			}, []);

			// ---- wheel zoom (native listener so preventDefault works)
			useEffect(() => {
				const surface = surfaceRef.current;
				if (!surface) return;
				const onWheel = (e) => {
					e.preventDefault();
					const rect = surface.getBoundingClientRect();
					const sx = e.clientX - rect.left, sy = e.clientY - rect.top;
					const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
					setViewport((v) => {
						const ns = clamp(v.scale * factor, 0.1, 4);
						const k = ns / v.scale;
						return { scale: ns, x: sx - (sx - v.x) * k, y: sy - (sy - v.y) * k };
					});
				};
				surface.addEventListener("wheel", onWheel, { passive: false });
				return () => surface.removeEventListener("wheel", onWheel);
			}, []);

			// ---- gestures
			const capture = (surface, e) => {
				try { surface.setPointerCapture(e.pointerId); } catch (_) { /* untrusted/synthetic pointer: no active pointer to capture */ }
			};
			const beginPan = (e, surface, sx, sy, vp) => {
				capture(surface, e);
				dragRef.current = { mode: "pan", pointerId: e.pointerId, startSX: sx, startSY: sy, originVp: { ...vp } };
				setPanning(true);
				e.preventDefault();
			};
			const beginCreate = (e, surface, sx, sy, vp, currentTool) => {
				capture(surface, e);
				const world = screenToWorld(vp, { x: sx, y: sy });
				const draft = makeDraft(currentTool, world, world, vp.scale);
				dragRef.current = { mode: "create", pointerId: e.pointerId, startSX: sx, startSY: sy, startWorld: world, draft, prevElements: elementsRef.current, scale: vp.scale };
			};
			const beginSelectDrag = (e, surface, sx, sy, vp, el) => {
				const spt = { x: sx, y: sy };
				const handle = hitHandle(el, vp, spt, vp.scale);
				capture(surface, e);
				if (handle) {
					dragRef.current = { mode: "resize", pointerId: e.pointerId, startSX: sx, startSY: sy, elId: el.id, origin: JSON.parse(JSON.stringify(el)), handle, prevElements: elementsRef.current, scale: vp.scale };
				} else {
					dragRef.current = { mode: "move", pointerId: e.pointerId, startSX: sx, startSY: sy, elId: el.id, origin: JSON.parse(JSON.stringify(el)), prevElements: elementsRef.current, scale: vp.scale };
				}
				setSelectedId(el.id);
			};
			const beginPanRef = useRef(beginPan);
			beginPanRef.current = beginPan;
			const beginCreateRef = useRef(beginCreate);
			beginCreateRef.current = beginCreate;
			const beginSelectDragRef = useRef(beginSelectDrag);
			beginSelectDragRef.current = beginSelectDrag;

			const onSurfacePointerDown = (e) => {
				if (editingRef.current !== null) {
					stopEditingRef.current(true);
					return;
				}
				const surface = surfaceRef.current;
				if (!surface) return;
				const rect = surface.getBoundingClientRect();
				const sx = e.clientX - rect.left, sy = e.clientY - rect.top;
				const vp = viewportRef.current;
				const spt = { x: sx, y: sy };
				const space = spaceRef.current;
				if (space || e.button === 1 || e.button === 2) { beginPanRef.current(e, surface, sx, sy, vp); return; }
				const currentTool = toolRef.current;
				if (currentTool !== "select") { beginCreateRef.current(e, surface, sx, sy, vp, currentTool); return; }
				const el = hitTest(elementsRef.current, vp, spt);
				if (el) { beginSelectDragRef.current(e, surface, sx, sy, vp, el); return; }
				setSelectedId(null);
				beginPanRef.current(e, surface, sx, sy, vp);
			};

			const onElementDoubleClick = (e, el) => {
				e.stopPropagation();
				if (el.type === "design") {
					setPreviewId((cur) => cur === el.id ? null : el.id);
					return;
				}
				startEditingElRef.current(el);
			};
			const elementDoubleClickRef = useRef(onElementDoubleClick);
			elementDoubleClickRef.current = onElementDoubleClick;

			const onSurfacePointerMove = (e) => {
				const drag = dragRef.current;
				if (!drag || drag.pointerId !== e.pointerId) return;
				const surface = surfaceRef.current;
				if (!surface) return;
				const rect = surface.getBoundingClientRect();
				const sx = e.clientX - rect.left, sy = e.clientY - rect.top;
				if (drag.mode === "pan") {
					setViewport((v) => ({ ...v, x: drag.originVp.x + (sx - drag.startSX), y: drag.originVp.y + (sy - drag.startSY) }));
					return;
				}
				const scale = drag.scale ?? viewportRef.current.scale;
				const wdx = (sx - drag.startSX) / scale;
				const wdy = (sy - drag.startSY) / scale;
				if (drag.mode === "create") {
					const end = { x: drag.startWorld.x + wdx, y: drag.startWorld.y + wdy };
					const next = makeDraft(drag.draft.type, drag.startWorld, end, scale, { id: drag.draft.id, color: drag.draft.color });
					setElements((prev) => prev.some((p) => p.id === next.id) ? prev.map((el) => el.id === next.id ? next : el) : [...prev, next]);
					return;
				}
				setElements((prev) => prev.map((el) => {
					if (el.id !== drag.elId) return el;
					if (drag.mode === "move") return { ...drag.origin, x: drag.origin.x + wdx, y: drag.origin.y + wdy };
					if (drag.mode === "resize") {
						if (el.type === "design") {
							const nw = Math.max(120, drag.handle === "w" ? drag.origin.w - wdx : drag.origin.w + wdx);
							const nx = drag.handle === "w" ? drag.origin.x + (drag.origin.w - nw) : drag.origin.x;
							return { ...drag.origin, x: nx, w: nw, h: DESIGN_CHROME + Math.round(el.deviceH * nw / el.deviceW) };
						}
						if (isLinear(el.type)) {
							const points = drag.origin.points.map((p) => ({ ...p }));
							if (drag.handle === "start") points[0] = { x: drag.origin.points[0].x + wdx, y: drag.origin.points[0].y + wdy };
							if (drag.handle === "end") points[1] = { x: drag.origin.points[1].x + wdx, y: drag.origin.points[1].y + wdy };
							return { ...drag.origin, points };
						}
						return { ...drag.origin, ...applyResize(drag.origin, drag.handle, wdx, wdy) };
					}
					return el;
				}));
			};

			const onSurfacePointerUp = (e) => {
				const drag = dragRef.current;
				if (!drag || drag.pointerId !== e.pointerId) return;
				dragRef.current = null;
				setPanning(false);
				const surface = surfaceRef.current;
				if (!surface) return;
				try { surface.releasePointerCapture(e.pointerId); } catch (_) { /* already released */ }
				const rect = surface.getBoundingClientRect();
				const sx = e.clientX - rect.left, sy = e.clientY - rect.top;
				const scale = drag.scale ?? viewportRef.current.scale;
				if (drag.mode === "create") {
					const wdx = (sx - drag.startSX) / scale;
					const wdy = (sy - drag.startSY) / scale;
					const end = { x: drag.startWorld.x + wdx, y: drag.startWorld.y + wdy };
					const draft = makeDraft(drag.draft.type, drag.startWorld, end, scale, { id: drag.draft.id, color: drag.draft.color });
					const prev = drag.prevElements;
					commitElements(prev, [...prev, draft]);
					setSelectedId(draft.id);
					if (draft.type === "note" || draft.type === "text") startEditingEl(draft);
				} else if (drag.mode === "move" || drag.mode === "resize") {
					const prev = drag.prevElements;
					const current = elementsRef.current;
					if (JSON.stringify(prev) !== JSON.stringify(current)) commitElements(prev, current);
				}
			};

			const onSurfacePointerCancel = (e) => {
				const drag = dragRef.current;
				if (!drag || drag.pointerId !== e.pointerId) return;
				if (drag.mode === "create") setElements((prev) => prev.filter((el) => el.id !== drag.draft.id));
				dragRef.current = null;
				setPanning(false);
			};

			const pointerDownRef = useRef(onSurfacePointerDown);
			pointerDownRef.current = onSurfacePointerDown;
			const pointerMoveRef = useRef(onSurfacePointerMove);
			pointerMoveRef.current = onSurfacePointerMove;
			const pointerUpRef = useRef(onSurfacePointerUp);
			pointerUpRef.current = onSurfacePointerUp;
			const pointerCancelRef = useRef(onSurfacePointerCancel);
			pointerCancelRef.current = onSurfacePointerCancel;

			// ---- clear/import arm timeouts
			useEffect(() => {
				if (!armClear) return;
				const timer = setTimeout(() => setArmClear(false), 2500);
				return () => clearTimeout(timer);
			}, [armClear]);
			useEffect(() => {
				if (!armImport) return;
				const timer = setTimeout(() => setArmImport(false), 2500);
				return () => clearTimeout(timer);
			}, [armImport]);

			const fitView = useCallback((els) => {
				const surface = surfaceRef.current;
				if (!surface) return;
				const rect = surface.getBoundingClientRect();
				if (!els || els.length === 0) { setViewport({ x: 24, y: 24, scale: 1 }); return; }
				const b = bboxOf(els);
				const bw = Math.max(b.maxX - b.minX, 1), bh = Math.max(b.maxY - b.minY, 1);
				const s = clamp(Math.min(rect.width / (bw + 80), rect.height / (bh + 80), 1.5), 0.15, 2);
				setViewport({ x: (rect.width - bw * s) / 2 - b.minX * s, y: (rect.height - bh * s) / 2 - b.minY * s, scale: s });
			}, []);
			const zoomBy = useCallback((factor) => {
				setViewport((v) => {
					const ns = clamp(v.scale * factor, 0.1, 4);
					const k = ns / v.scale;
					const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
					return { scale: ns, x: cx - (cx - v.x) * k, y: cy - (cy - v.y) * k };
				});
			}, []);

			const selected = selectedId === null ? null : elements.find((el) => el.id === selectedId) ?? null;
			const scale = viewport.scale;

			// selection chrome rendered inside the world layer → world coordinates
			const renderSelectionChrome = (el) => {
				const hs = Math.max(6, 10 / scale);
				if (isLinear(el.type)) {
					return el.points.map((p, i) => jsx("div", {
						key: i === 0 ? "start" : "end",
						className: "dshcv_handle",
						style: { left: p.x - hs / 2, top: p.y - hs / 2, width: hs, height: hs, cursor: "move" }
					}));
				}
				if (el.type === "design") {
					return [["e", 1], ["w", 0]].map(([name, fx]) => jsx("div", {
						key: name,
						className: "dshcv_handle",
						style: { left: el.x + el.w * fx - hs / 2, top: el.y + el.h / 2 - hs / 2, width: hs, height: hs, cursor: name === "e" ? "ew-resize" : "ew-resize" }
					}));
				}
				return Object.keys(HANDLE_POINTS).map((name) => {
					const [fx, fy] = HANDLE_POINTS[name];
					const hx = el.x + el.w * fx, hy = el.y + el.h * fy;
					return jsx("div", {
						key: name,
						className: "dshcv_handle",
						style: { left: hx - hs / 2, top: hy - hs / 2, width: hs, height: hs, cursor: HANDLE_CURSOR[name] }
					});
				});
			};

			const renderElement = (el) => {
				const isSel = selectedId === el.id;
				const editingNow = editing !== null && editing.id === el.id;
				const editProps = {
					editing: editingNow,
					editDraft,
					onDoubleClick: (e, target) => elementDoubleClickRef.current(e, target),
					onEditInput: setEditDraft,
					onEditKeyDown: (e) => {
						if (e.key === "Escape") { e.stopPropagation(); stopEditingRef.current(false); }
						else if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); e.currentTarget.blur(); }
					},
					onEditBlur: () => stopEditingRef.current(true)
				};
				if (el.type === "note") return NoteEl({ el, selected: isSel, ...editProps });
				if (el.type === "text") return TextEl({ el, selected: isSel, ...editProps });
				if (el.type === "design") return DesignEl({ el, selected: isSel, preview: previewId === el.id, onDoubleClick: (e, target) => elementDoubleClickRef.current(e, target), onTogglePreview: (target) => { setPreviewId((cur) => cur === target.id ? null : target.id); } });
				if (isLinear(el.type)) return ArrowEl({ el, selected: isSel, onDoubleClick: (e, target) => elementDoubleClickRef.current(e, target) });
				return ShapeEl({ el, selected: isSel, onDoubleClick: (e, target) => elementDoubleClickRef.current(e, target) });
			};

			if (!sessionId) return null;
			return jsxs("div", {
				className: "dshcv_root",
				children: [
					jsx("div", {
						ref: surfaceRef,
						className: "dshcv_surface",
						"data-panning": panning || undefined,
						"data-tool": tool,
						onPointerDown: (e) => pointerDownRef.current(e),
						onPointerMove: (e) => pointerMoveRef.current(e),
						onPointerUp: (e) => pointerUpRef.current(e),
						onPointerCancel: (e) => pointerCancelRef.current(e),
						onContextMenu: (e) => e.preventDefault(),
						children: jsxs("div", {
							className: "dshcv_world",
							style: { transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.scale})` },
							children: [
								jsx("div", { className: "dshcv_grid" }),
								elements.map((el) => {
									const node = renderElement(el);
									return node;
								}),
								selected !== null && renderSelectionChrome(selected)
							]
						})
					}),
					elements.length === 0 && jsx("div", { className: "dshcv_empty", children: t("empty") }),
					jsx(Toolbar, {
						t, tool, setTool,
						canUndo: history.past.length > 0, canRedo: history.future.length > 0,
						onUndo: undo, onRedo: redo,
						zoom: scale,
						onZoomIn: () => zoomBy(1.2), onZoomOut: () => zoomBy(1 / 1.2),
						onResetZoom: () => setViewport((v) => ({ ...v, scale: 1 })),
						onFit: () => fitView(elementsRef.current),
						onDelete: deleteSelected,
						onClear: () => { if (armClear) clearAll(); else setArmClear(true); },
						onImport: () => { if (armImport || elementsRef.current.length === 0) importBlueprintRef.current(); else setArmImport(true); },
						armClear, armImport, hasSelection: selected !== null, hasElements: elements.length > 0
					}),
					jsx("div", { className: "dshcv_hint", children: t("hint") })
				]
			});
		}
		//#endregion
		//#region client plugin body
		const inject = ["slots", "locale"];
		/**
		 * Client plugin body: register the Design canvas view tab. The
		 * registration rides the slot service's inject wrapper, so plugin unload
		 * removes the tab.
		 * @param ctx - client root context.
		 */
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, { zh, en }), "ui-canvas: dictionaries");
			const t = ctx.locale.bind(NS);
			ctx.slots.inject("conversation.view", () => ctx.slots.register({
				name: "conversation.view",
				id: "design",
				order: 1,
				locale: NS,
				label: () => t("view.design")
			}, DesignCanvasView));
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
