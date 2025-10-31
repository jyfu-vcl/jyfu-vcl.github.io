---
title: "ProSplat: Improved Feed-Forward 3D Gaussian Splatting for Wide-Baseline Sparse Views"
collection: publications
category: manuscripts
permalink: /publication/2025-ProSplat-number-6
excerpt: 'This paper introduces one-step DiT-based post refining tools for 3D scene reconstruction.'
date: 2025-12-01
venue: 'IEEE Transactions on Circuits and Systems for Video Technology (*Under Review*)'
paperurl: 'https://academicpages.github.io/files/ProSplat2025.pdf'
citation: 'Lu, X., Fu, J., Zhang, J., Song, Z., Jia, C. and Ma, S., 2025. ProSplat: Improved Feed-Forward 3D Gaussian Splatting for Wide-Baseline Sparse Views. arXiv preprint arXiv:2506.07670.'
---
Feed-forward 3D Gaussian Splatting (3DGS) has recently demonstrated promising results for novel view synthesis (NVS) from sparse input views, particularly under narrow-baseline conditions. However, its performance significantly degrades in wide-baseline scenarios due to limited texture details and geometric inconsistencies across views.
To address these challenges, in this paper, we propose ProSplat, a two-stage feed-forward framework designed for high-fidelity rendering under wide-baseline conditions. The first stage involves generating 3D Gaussian primitives via a 3DGS generator. In the second stage, rendered views from these primitives are enhanced through an improvement model. Specifically, this improvement model is based on a one-step diffusion model, further optimized by our proposed Maximum Overlap Reference view Injection (MORI) and Distance-Weighted Epipolar Attention (DWEA). MORI supplements missing texture and color by strategically selecting a reference view with maximum viewpoint overlap, while DWEA enforces geometric consistency using epipolar constraints.
Additionally, we introduce a divide-and-conquer training strategy that aligns data distributions between the two stages through joint optimization. We evaluate ProSplat on the RealEstate10K and DL3DV-10K datasets under wide-baseline settings. Experimental results demonstrate that ProSplat achieves an average improvement of 1 dB in PSNR compared to recent SOTA methods.
