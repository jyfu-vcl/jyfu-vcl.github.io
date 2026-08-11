(function () {
  "use strict";

  const performance = {
    ranking: [
      { group: "Score-based metrics", method: "PSNR", note: "full-reference", values: { 1: [0.687, 0.817], 7: [0.808, 0.876], 14: [0.813, 0.876] } },
      { group: "Score-based metrics", method: "SSIM", note: "structural similarity", values: { 1: [0.753, 0.833], 7: [0.829, 0.892], 14: [0.841, 0.891] } },
      { group: "Score-based metrics", method: "LPIPS", note: "perceptual distance", values: { 1: [0.798, 0.817], 7: [0.723, 0.758], 14: [0.748, 0.763] } },
      { group: "Score-based metrics", method: "DISTS", note: "perceptual distance", values: { 1: [0.661, 0.722], 7: [0.658, 0.729], 14: [0.669, 0.724] } },
      { group: "Score-based metrics", method: "VMAF", note: "full-reference", values: { 1: [0.782, 0.853], 7: [0.876, 0.919], 14: [0.878, 0.917] } },
      { group: "Vision-language evaluators", method: "VLM Ensemble", note: "Kimi-K2.6 + Opus-4.7", values: { 1: [0.798, 0.799], 7: [0.794, 0.798], 14: [0.753, 0.766] } },
      { group: "Vision-language evaluators", method: "Q-ReAlign-Pro-9B", note: "vision-language judge", values: { 1: [0.636, 0.675], 7: [0.642, 0.679], 14: [0.691, 0.687] } },
      { group: "Vision-language evaluators", method: "DeQA-Score", note: "vision-language judge", values: { 1: [0.511, 0.650], 7: [0.483, 0.647], 14: [0.461, 0.632] } },
      { group: "Vision-language evaluators", method: "Q-Insight", note: "no-reference image judge", values: { 1: [0.587, 0.650], 7: [0.589, 0.651], 14: [0.614, 0.659] } },
      { group: "Vision-language evaluators", method: "VQ-Insight", note: "no-reference video judge", values: { 1: [0.663, 0.681], 7: [0.573, 0.639], 14: [0.672, 0.674] } },
      { group: "Vision-language evaluators", method: "CodecArena · Qwen2.5-VL-7B", note: "Facet-GRPO", delta: { 1: [0.235, 0.228], 7: [0.407, 0.365], 14: [0.456, 0.413] }, ours: "secondary", values: { 1: [0.871, 0.906], 7: [0.902, 0.912], 14: [0.906, 0.908] } },
      { group: "Vision-language evaluators", method: "CodecArena · Qwen3-VL-8B", note: "Facet-GRPO", delta: { 1: [0.161, 0.185], 7: [0.190, 0.198], 14: [0.199, 0.228] }, ours: "primary", values: { 1: [0.877, 0.909], 7: [0.895, 0.923], 14: [0.894, 0.924] } }
    ],
    pairwise: [
      { group: "Score-based metrics", method: "PSNR", note: "full-reference", values: { 1: [80.8], 7: [85.8], 14: [86.7] } },
      { group: "Score-based metrics", method: "SSIM", note: "structural similarity", values: { 1: [83.3], 7: [87.9], 14: [88.9] } },
      { group: "Score-based metrics", method: "LPIPS", note: "perceptual distance", values: { 1: [82.9], 7: [79.6], 14: [78.9] } },
      { group: "Score-based metrics", method: "DISTS", note: "perceptual distance", values: { 1: [73.8], 7: [75.0], 14: [76.1] } },
      { group: "Score-based metrics", method: "VMAF", note: "full-reference", values: { 1: [85.8], 7: [89.2], 14: [90.0] } },
      { group: "Vision-language evaluators", method: "VLM Ensemble", note: "Kimi-K2.6 + Opus-4.7", values: { 1: [85.2], 7: [80.9], 14: [83.6] } },
      { group: "Vision-language evaluators", method: "Q-ReAlign-Pro-9B", note: "vision-language judge", values: { 1: [78.3], 7: [77.5], 14: [81.1] } },
      { group: "Vision-language evaluators", method: "DeQA-Score", note: "vision-language judge", values: { 1: [73.4], 7: [72.1], 14: [73.9] } },
      { group: "Vision-language evaluators", method: "Q-Insight", note: "no-reference image judge", values: { 1: [80.9], 7: [76.5], 14: [75.6] } },
      { group: "Vision-language evaluators", method: "VQ-Insight", note: "no-reference video judge", values: { 1: [81.8], 7: [79.0], 14: [83.4] } },
      { group: "Vision-language evaluators", method: "CodecArena · Qwen2.5-VL-7B", note: "Facet-GRPO", ours: "secondary", values: { 1: [89.5], 7: [92.7], 14: [92.3] } },
      { group: "Vision-language evaluators", method: "CodecArena · Qwen3-VL-8B", note: "Facet-GRPO", ours: "primary", values: { 1: [93.7], 7: [94.9], 14: [93.0] } }
    ]
  };

  let activeProtocol = "ranking";
  let activeK = 7;

  const head = document.getElementById("results-head");
  const body = document.getElementById("results-body");
  const context = document.getElementById("table-context");
  const note = document.getElementById("table-note");

  function renderTable() {
    if (!head || !body || !context || !note) return;

    const ranking = activeProtocol === "ranking";
    const columns = ranking ? ["Method", "SRCC ↑", "PLCC ↑"] : ["Method", "Accuracy ↑"];
    head.innerHTML = `<tr>${columns.map((column) => `<th scope="col">${column}</th>`).join("")}</tr>`;

    const rows = performance[activeProtocol];
    const metricCount = rows[0].values[activeK].length;
    const rankedByColumn = Array.from({ length: metricCount }, (_, columnIndex) =>
      [...new Set(rows.map((row) => row.values[activeK][columnIndex]))].sort((a, b) => b - a)
    );
    const bestByColumn = rankedByColumn.map((values) => values[0]);
    const secondByColumn = rankedByColumn.map((values) => values[1]);
    let currentGroup = "";
    const output = [];

    rows.forEach((row) => {
      if (row.group !== currentGroup) {
        output.push(`<tr class="group-row"><th scope="rowgroup" colspan="${columns.length}">${row.group}</th></tr>`);
        currentGroup = row.group;
      }

      const className = row.ours ? `ours-row ${row.ours === "primary" ? "ours-primary" : ""}` : "";
      const metricCells = row.values[activeK].map((value, columnIndex) => {
        const formatted = ranking ? Number(value).toFixed(3) : `${Number(value).toFixed(1)}%`;
        const classes = [
          Number(value) === bestByColumn[columnIndex] ? "metric-best" : "",
          Number(value) === secondByColumn[columnIndex] ? "metric-second" : ""
        ].filter(Boolean).join(" ");
        return `<td class="${classes}">${formatted}</td>`;
      }).join("");

      const rowNote = ranking && row.delta
        ? `${row.note} · Δ SRCC +${row.delta[activeK][0].toFixed(3)}, Δ PLCC +${row.delta[activeK][1].toFixed(3)} vs. backbone`
        : row.note;
      output.push(`<tr class="${className}"><td>${row.method}<small class="method-note">${rowNote}</small></td>${metricCells}</tr>`);
    });

    body.innerHTML = output.join("");
    context.textContent = ranking
      ? `Score-induced within-group ranking at K=${activeK}, evaluated with SRCC and PLCC.`
      : `Pairwise preference accuracy at K=${activeK}; each method selects the reconstruction closer to the human choice.`;
    note.textContent = activeK === 14
      ? ranking
        ? "K=14 evaluates 60 groups at 480p and above and tests temporal extrapolation beyond the K≤7 training context."
        : "K=14 evaluates 60 cut-free groups and tests temporal extrapolation beyond the K≤7 training context."
      : `K=${activeK} evaluates all 80 source-disjoint CodecArena-Bench groups.`;
  }

  function selectControl(selector, value, dataName) {
    document.querySelectorAll(selector).forEach((button) => {
      const selected = String(button.dataset[dataName]) === String(value);
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  }

  document.querySelectorAll("[data-protocol]").forEach((button) => {
    button.addEventListener("click", () => {
      activeProtocol = button.dataset.protocol || "ranking";
      selectControl("[data-protocol]", activeProtocol, "protocol");
      renderTable();
    });
  });

  document.querySelectorAll("[data-k]").forEach((button) => {
    button.addEventListener("click", () => {
      activeK = Number(button.dataset.k || 7);
      selectControl("[data-k]", activeK, "k");
      renderTable();
    });
  });

  const menuButton = document.querySelector(".menu-button");
  const navigation = document.getElementById("site-nav");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      navigation.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
        navigation.classList.remove("is-open");
        document.body.classList.remove("menu-open");
      });
    });
  }

  const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${visible.target.id}`;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-25% 0px -60% 0px", threshold: [0.05, 0.2, 0.5] });
    sections.forEach((section) => observer.observe(section));
  }

  const copyButton = document.querySelector("[data-copy-citation]");
  const citation = document.getElementById("citation");
  if (copyButton && citation) {
    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(citation.textContent.trim());
        copyButton.textContent = "Copied";
        window.setTimeout(() => { copyButton.textContent = "Copy"; }, 1600);
      } catch (_error) {
        copyButton.textContent = "Select text";
      }
    });
  }

  renderTable();
})();
