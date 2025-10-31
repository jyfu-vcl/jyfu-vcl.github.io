---
title: "Recurrent Intra Prediction Mode in Future Video Coding"
collection: publications
category: conferences
permalink: /publication/2025-RIPM-number-1
excerpt: 'This paper introduces Recurrent Intra Prediction Mode to Next-Gen Video Coding Software (ECM).'
date: 2025-03-16
venue: 'Proceedings of the IEEE Data Compression Conference (DCC)'
paperurl: 'https://academicpages.github.io/files/DCC2025.pdf'
citation: 'Fu, J., Meng, X., Ma, S., Zhang, J., Chang, Y. J., Seregin, V., & Karczewicz, M. (2025, March). Recurrent Intra Prediction Mode for Future Video Coding. In 2025 Data Compression Conference (DCC) (pp. 183-192). IEEE.'
---
Intra prediction is a crucial component of hybrid video coding framework due to its remarkable ability to reduce spatial redundancy in video signals. Unlike the single-mode based intra prediction in HEVC and VVC, intra fusion prediction methods, that combine the results of multiple angular prediction modes, were newly adopted by Enhanced Compression Model (ECM). However, intra fusion prediction over-relies on local spatial correlations and neglects potential texture similarities in non-adjacent regions. To overcome these limitations and elevate the accuracy of luma intra prediction, a Recurrent Intra Prediction Mode (RIPM) is proposed in this paper, which is composed of two sub-modules, i.e., Recurrent Intra Merge Mode (RIMM) and Recurrent Block Vector Substitution Module (RBVSM). RIMM utilizes the recurrent spatial texture information of the adjacent and non-adjacent spaces for adaptive mode derivation and prediction within the intra fusion prediction framework. RBVSM is a sophisticated mechanism for adaptive prediction mode selection and weight assignment during intra fusion prediction, resulting in enhanced coding performance with minimal impact on computational complexity. The proposed method, implemented on top of ECM-12.0, demonstrates a 0.095% BD-rate gain for the luma component under All Intra configuration, with negligible complexity increase. Currently, RIPM is adopted in ECM in JVET.
