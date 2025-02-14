---
layout: page
title: CLAD
description: A Contrastive Learning based Approach for Background Debiasing
img: assets/img/publication_preview/clad_chart.png
importance: 5
category: work
permalink: /projects/clad/
github: https://github.com/wang-kee/CLAD
related_publications: clad
giscus_comments: false
---

CLAD (Contrastive Learning for Adversarial Debiasing) introduces a novel approach to reduce background bias in deep learning models through contrastive learning techniques. This project addresses a critical challenge in computer vision where models often learn spurious correlations with image backgrounds instead of focusing on the main objects of interest.

## Key Features

- Contrastive learning framework for background debiasing
- Novel loss function design for improved feature learning
- Extensive evaluation on multiple datasets
- State-of-the-art results in reducing background bias

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/project_preview/clad_method.jpg" title="CLAD Method" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Overview of the CLAD methodology showing how contrastive learning helps in background debiasing.
</div>

## Technical Details

The project implements two main components:

1. **Contrastive Learning Module**
   - Feature extraction and representation learning
   - Background-aware negative sampling
   - Adaptive margin selection

2. **Debiasing Framework**
   - Background separation techniques
   - Multi-task learning approach
   - Evaluation metrics for bias measurement

For more technical details, refer to our publication {% cite clad %}. 