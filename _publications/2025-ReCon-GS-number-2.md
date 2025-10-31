---
title: "ReCon-GS: Continuum-Preserved Gaussian Streaming for Fast and Compact Reconstruction of Dynamic Scenes"
collection: publications
category: conferences
permalink: /publication/2025-ReCon-GS-number-2
excerpt: 'This paper introduces ReCon-GS, a 4D streaming reconstruction pipeline based on 3DGS.'
date: 2025-12-01
venue: 'Proceedings of the Advances in Neural Information Processing Systems (NeurIPS)'
paperurl: 'https://academicpages.github.io/files/NIPS2025.pdf'
citation: 'Fu, J., Gao, Q., Wen, C., Wu, Y., Ma, S., Zhang, J., & Zhang, J. (2025). ReCon-GS: Continuum-Preserved Guassian Streaming for Fast and Compact Reconstruction of Dynamic Scenes. In Proceedings of the Advances in Neural Information Processing Systems (NeurIPS).'
---
Online free-viewpoint video (FVV) reconstruction is challenged by slow per-frame optimization, inconsistent motion estimation, and unsustainable storage demands. To address these challenges, we propose the **Re**configurable **Con**tinuum Gaussian Stream, dubbed **ReCon-GS**, a novel storage-aware framework that enables high-fidelity online dynamic scene reconstruction and real-time rendering. Specifically, we dynamically allocate multi-level Anchor Gaussians in a density-adaptive fashion to capture inter-frame geometric deformations, thereby decomposing scene motion into compact coarse-to-fine representations. Then, we design a dynamic hierarchy reconfiguration strategy that preserves localized motion expressiveness through on-demand anchor re-hierarchization,  while ensuring temporal consistency through intra-hierarchical deformation inheritance that confines transformation priors to their respective hierarchy levels. Furthermore, we introduce a storage-aware optimization mechanism that flexibly adjusts the density of Anchor Gaussians at different hierarchy levels, enabling a controllable trade-off between reconstruction fidelity and memory usage. Extensive experiments on three widely used datasets demonstrate that, compared to state‐of‐the‐art methods, ReCon-GS improves training efficiency by approximately 15% and achieves superior FVV synthesis quality with enhanced robustness and stability. Moreover, at equivalent rendering quality, ReCon-GS slashes memory requirements by over 50% compared to leading state‑of‑the‑art methods. [Code](ttps://github.com/jyfu-vcl/ReCon-GS/) is avaliable now.
