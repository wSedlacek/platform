# @ng-easy/image-optimizer

[![npm latest version](https://img.shields.io/npm/v/@ng-easy/image-optimizer/latest.svg)](https://www.npmjs.com/package/@ng-easy/image-optimizer) [![README](https://img.shields.io/badge/README--green.svg)](/libs/image-optimizer/README.md) [![CHANGELOG](https://img.shields.io/badge/CHANGELOG--orange.svg)](/libs/image-optimizer/CHANGELOG.md)

Node library that implements image optimizations for the web. It uses internally the super-fast [sharp](https://sharp.pixelplumbing.com/) library.

## Usage

```ts
import fs from 'fs-extra';
import { getImageOptimizer, ImageOptimizerOptions, ImageOptimizer, ImageCache, FilesystemImageCache } from '@ng-easy/image-optimizer';

// Read the original image from the filesystem
const imageAssetPath = 'image.jpg';
const originalImage: Buffer = await fs.readFile(imageAssetPath);

// Get the optimizer and instantiate a cache (optional)
const imageOptimizer: ImageOptimizer = getImageOptimizer(imageAssetPath, originalImage);
const imageCache: ImageCache = new FilesystemImageCache(path.join(process.cwd(), 'tmp'));

// Run the optimization and get the resulting buffer
const options: ImageOptimizerOptions = { format: 'webp', width: 1080, quality: 70 };
const optimizedImage = await imageOptimizer.optimize(originalImage, imageOptimizationTest.options, imageCache);
```

## Supported file types

- jpg, webp, heif, avif
- _Pending: png_
