---
layout: page
title: A Little Fog for a Large Turn
description: Generating realistic foggy conditions to test autonomous navigation systems
img: assets/project_preview/fog.jpg
importance: 2
category: work
permalink: /projects/little_fog/
github: https://github.com/harsmac/A_Little_fog_for_a_Large_Turn
related_publications: machiraju2020little
giscus_comments: true
---

This project explores how adverse weather conditions, particularly fog, can act as natural adversaries to autonomous navigation systems. We present a novel approach to generating realistic foggy conditions that can be used to test and evaluate autonomous vehicle steering models.

## Key Features

- Novel methodology for generating adversarial weather conditions using generative models
- CycleGAN and DistanceGAN-based implementations
- Framework for testing autonomous navigation models under adverse conditions
- Perceptual similarity-based definition of adversarial perturbations

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/project_preview/fog_generation.jpg" title="Fog Generation Overview" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Overview of our fog generation framework showing how clear weather images are transformed into realistic foggy conditions.
</div>

## Technical Implementation

The project uses two main approaches for generating foggy conditions:

1. **CycleGAN Implementation**

   - Learns mappings between clear and foggy domains
   - Maintains structural consistency of the original image
   - Generates realistic fog effects

2. **DistanceGAN Implementation**
   - Alternative approach focusing on distance preservation
   - Provides different perspective on fog generation
   - Requires Python 2 environment

<div class="row">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/project_preview/fog_results.jpg" title="Results" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/project_preview/fog_steering.jpg" title="Steering Analysis" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Left: Examples of generated foggy conditions from clear weather images. Right: Analysis of steering angle predictions under foggy conditions.
</div>

## Impact and Applications

This work has important implications for:

- Testing robustness of autonomous driving systems
- Creating synthetic adverse weather datasets
- Understanding how weather conditions affect model predictions
- Developing more robust navigation systems

The code is available on [GitHub](https://github.com/harsmac/A_Little_fog_for_a_Large_Turn) and the work was published at WACV 2020. For more details, check out our paper {% cite machiraju2020little %}.
