# Changelog - ![Latest Release](https://img.shields.io/github/v/release/llgava/loom-action?logo=github&logoColor=959da5&labelColor=353c43&color=0091c2&Current&label=Latest%20Release)

## [1.2.0: Ignore Files Support](https://github.com/llgava/loom-action/releases/tag/v1.1.0)
##### [Commit History](https://github.com/llgava/loom-action/compare/v1.1.0...v1.2.0) - (01-25-2023)

### **Added**
* Ignore option to pattern files configuration.<br />
Ignore option should be a list of [Glob Patterns](https://www.malikbrowne.com/blog/a-beginners-guide-glob-patterns) where any file matching to any listed Glob Pattern will be ignored on configured verification. See a example on [Seface's Pattern](./dist/patterns/seface_blocks.yml) at `name-patterns` configuration.

### **Issues**
* Fixed a typo on [Seface's Pattern](./dist/patterns/seface_blocks.yml) causing the workflow to fail.

## [1.1.0: Name Patterns Support](https://github.com/llgava/loom-action/releases/tag/v1.1.0)
##### [Commit History](https://github.com/llgava/loom-action/compare/v1.0.1...v1.1.0) - (01-20-2023)

### **Added**
* New pattern input option: `seface_blocks`.
* Name Pattern Support. The Name Pattern can check if a identifier matches to a Regex Expression for the folling groups:
  * **Behavior Pack**
    * Animation Controllers
    * Animations
    * Entities
    * Blocks
    * Items
  * **Resource Pack**
    * Animation Controllers
    * Animations
    * Entity
    * Items
    * Geometries (only for `format_version` 1.12.0+).

  See the [pattern.template.yml](./.github/pattern.template.yml) file for more informations on how to configure the Name Pattern.

### **Issues**
* Fixed an issue where [FilePattern](https://github.com/llgava/loom-action/blob/a30e818527a0d0bb487bdfb5e9277697c3463183/src/core/FilePattern.ts#L36) was reading files with invalid groups, causing the workflow to fail.

## [1.0.1: Hotfix #1](https://github.com/llgava/loom-action/releases/tag/v1.0.1)
##### [Commit History](https://github.com/llgava/loom-action/compare/v1.0.0...v1.0.1) - (01-16-2023)

### **Issues**
* Fixed an issue where [FilePattern](https://github.com/llgava/loom-action/blob/a30e818527a0d0bb487bdfb5e9277697c3463183/src/core/FilePattern.ts#L36) was reading files with invalid groups, causing the workflow to fail.

## 1.0.0: File Endings Pattern
##### [Commit History](https://github.com/llgava/loom-action/commits/v1.0.0) - (01-16-2023)

### 🎉 **First release**

For more future features, see the [Roadmap](https://github.com/llgava/loom-action#roadmap) at readme page.
