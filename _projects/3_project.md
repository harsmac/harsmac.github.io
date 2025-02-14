---
layout: page
title: Latent Adversarial Training
description: Analyzing the weaknesses of adversarially trained neural networks and introducing Latent Adversarial Training (LAT) for improved robustness.
img: assets/img/publication_preview/latent_layers.jpg
importance: 3
category: research
permalink: /projects/harnessing_vulnerability/
github: https://github.com/msingh27/LAT_adversarial_robustness
related_publications: kumari2020latent
giscus_comments: true
---

This project investigates the robustness of latent layers in adversarially trained neural networks and proposes novel methods to enhance their resilience. Specifically, we introduce **Latent Adversarial Training (LAT)**, a fine-tuning technique that increases robustness at intermediate feature layers, and **Latent Attack (LA)**, a new adversarial attack targeting latent vulnerabilities.

## Key Features

- Analysis of robustness in latent layers of adversarially trained models.
- Introduction of **Latent Adversarial Training (LAT)** for improved model robustness.
- Development of **Latent Attack (LA)**, a novel adversarial attack exploiting latent layer weaknesses.
- Empirical validation on datasets such as MNIST, CIFAR-10, CIFAR-100, SVHN, and Restricted ImageNet.

## Technical Implementation

The project introduces two key methodologies:

### 1. **Latent Adversarial Training (LAT)**

- Fine-tunes adversarially trained models at latent layers to enhance robustness.
- Uses a combination of **input-space and latent-space perturbations** for training.
- Results in a **4-6% improvement** in adversarial accuracy on CIFAR-10 and CIFAR-100.

### 2. **Latent Attack (LA)**

- A new **l∞ adversarial attack** that specifically targets the latent layers.
- Constructs perturbations by manipulating feature representations rather than input pixels.
- Outperforms standard PGD attacks on multiple datasets.

## Impact and Applications

This research has significant implications for:

- Improving **adversarial robustness** of deep learning models.
- Enhancing security in **autonomous systems** and **computer vision applications**.
- Providing new benchmarks for **adversarial training methodologies**.
- Offering a more **systematic approach to understanding feature-layer vulnerabilities** in neural networks.

The code and implementation details are available on [GitHub](https://github.com/msingh27/LAT_adversarial_robustness). For more technical insights, refer to our publication: {% cite kumari2020latent %}.
