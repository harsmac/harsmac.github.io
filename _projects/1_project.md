---
layout: page
title: MUFIA
description: Frequency-Based Vulnerability Analysis of Deep Learning Models against Image Corruptions
img: assets/img/publication_preview/letterM.png
importance: 1
category: work
permalink: /projects/mufia/
github: https://github.com/harsmac/MUFIACode
related_publications: mufia
---

MUFIA (Multiplicative Frequency Attack) is a framework for analyzing the vulnerability of deep learning models to image corruptions through the lens of frequency analysis. The project provides tools to:

1. Analyze how different frequency components in images contribute to model predictions
2. Evaluate model robustness against various types of image corruptions
3. Understand the relationship between frequency characteristics and model vulnerability

## Key Features

- **Frequency Analysis Tools**: Decompose images into different frequency components using DCT transforms
- **Corruption Analysis**: Evaluate model performance against common image corruptions
- **Visualization Tools**: Generate visualizations to understand frequency-based vulnerabilities
- **Model Testing Framework**: Test different CNN architectures for robustness analysis

<div class="row">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/project_preview/mufia_overview.jpg" title="MUFIA Overview" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Overview of the MUFIA framework for analyzing model vulnerabilities through frequency analysis.
</div>

You can find more details in our paper {% cite mufia %} and check out the code on [GitHub](https://github.com/harsmac/MUFIACode).
