# Node.js Documentation Style Guide

This guide provides clear and concise instructions to help you create well-organized and readable documentation for
the Node.js community. It covers organization, spelling, formatting, and more to ensure consistency and
professionalism across all documents.

## Table of Contents

1. [General Guidelines](#general-guidelines)
2. [Writing Style](#writing-style)
3. [Punctuation](#punctuation)
4. [Document Structure](#document-structure)
5. [API Documentation](#api-documentation)
6. [Code Blocks](#code-blocks)
7. [Formatting](#formatting)
8. [Product and Project Naming](#product-and-project-naming)

***

## General Guidelines

### File Naming

* **Markdown Files:** Use `lowercase-with-dashes.md`.
  * Use underscores only if they are part of the topic name (e.g., `child_process`).
  * Some files, like top-level Markdown files, may be exceptions.

### Text Wrapping

* Wrap documents at 120 characters per line to enhance readability and version control.

### Editor Configuration

* Follow the formatting rules specified in `.editorconfig`.
  * A [plugin][plugin] is available for some editors to enforce these rules.

### Testing Documentation

* Validate documentation changes using `make test-doc -j` or `vcbuild test-doc`.

***

## Writing Style

### Spelling and Grammar

* **Spelling:** Use [US spelling][].
* **Grammar:** Use clear, concise language. Avoid unnecessary jargon.

### Commas

* **Serial Commas:** Use [serial commas][] for clarity.
  * Example: _apples, oranges, and bananas_

### Pronouns

* Avoid first-person pronouns (_I_, _we_).
  * Exception: Use _we recommend foo_ instead of _foo is recommended_.

### Gender-Neutral Language

* Use gender-neutral pronouns and plural nouns.
  * OK: _they_, _their_, _them_, _folks_, _people_, _developers_
  * NOT OK: _his_, _hers_, _him_, _her_, _guys_, _dudes_

### Terminology

* Use precise technical terms and avoid colloquialisms.
* Define any specialized terms or acronyms at first use.

***

## Punctuation

### Terminal Punctuation

* Place inside parentheses or quotes if the content is a complete clause.
* Place outside if the content is a fragment of a clause.

### Quotation Marks

* Use double quotation marks for direct quotes.
* Use single quotation marks for quotes within quotes.

### Colons and Semicolons

* Use colons to introduce lists or explanations.
* Use semicolons to link closely related independent clauses.

***

## Document Structure

### Headings

* Start documents with a level-one heading (`#`).
* Use subsequent headings (`##`, `###`, etc.) to organize content hierarchically.

### Links

* Prefer reference-style links (`[a link][]`) over inline links (`[a link](http://example.com)`).

### Lists

* Use bullet points for unordered lists and numbers for ordered lists.
* Keep list items parallel in structure.

### Tables

* Use tables to present structured information clearly. Ensure they are readable in plain text.

***

## API Documentation

### YAML Comments

* Update the YAML comments associated with the API, especially when introducing or deprecating an API.

### Usage Examples

* Provide a usage example or a link to an example for every function.

### Parameter Descriptions

* Clearly describe parameters and return values, including types and defaults.
  * Example:
    ```markdown
    * `byteOffset` {integer} Index of first byte to expose. **Default:** `0`.
    ```

***

## Code Blocks

### Language-Aware Fences

* Use language-aware fences (e.g., ` ```js `) for code blocks.
  * **Info String:** Use the appropriate info string from the following list:

    | Language      | Info String  |
    | ------------- | ------------ |
    | Bash          | `bash`       |
    | C             | `c`          |
    | CommonJS      | `cjs`        |
    | CoffeeScript  | `coffee`     |
    | Shell Session | `console`    |
    | C++           | `cpp`        |
    | Diff          | `diff`       |
    | HTTP          | `http`       |
    | JavaScript    | `js`         |
    | JSON          | `json`       |
    | Markdown      | `markdown`   |
    | EcmaScript    | `mjs`        |
    | Powershell    | `powershell` |
    | R             | `r`          |
    | Plaintext     | `text`       |
    | TypeScript    | `typescript` |

  * Use `text` for languages not listed until their grammar is added to [`remark-preset-lint-node`][].

### Code Comments

* Use comments to explain complex logic within code examples.
* Follow the standard commenting style of the respective language.

***

## Formatting

### Escaping Characters

* Use backslash-escaping for underscores, asterisks, and backticks: `\_`, `\*`, `` \` ``.

### Naming Conventions

* **Constructors:** Use PascalCase.
* **Instances:** Use camelCase.
* **Methods:** Indicate methods with parentheses: `socket.end()` instead of `socket.end`.

### Function Arguments and Returns

* **Arguments:**
  ```markdown
  * `name` {type|type2} Optional description. **Default:** `value`.
  ```
  Example:
  ```markdown
  * `byteOffset` {integer} Index of first byte to expose. **Default:** `0`.
  ```
* **Returns:**
  ```markdown
  * Returns: {type|type2} Optional description.
  ```
  Example:
  ```markdown
  * Returns: {AsyncHook} A reference to `asyncHook`.
  ```

***

## Product and Project Naming

<!-- lint disable prohibited-strings remark-lint-->

### Official Styling

* Use official capitalization for products and projects.
  * OK: JavaScript, Google's V8
  * NOT OK: Javascript, Google's v8

### Node.js References

* Use _Node.js_ instead of _Node_, _NodeJS_, or similar variants.
  * For the executable, _`node`_ is acceptable.

### Version References

* Use _Node.js_ and the version number in prose. Do not prefix the version number with _v_.
  * OK: _Node.js 14.x_, _Node.js 14.3.1_
  * NOT OK: _Node.js v14_

<!-- lint enable prohibited-strings remark-lint-->

***

[US spelling]: https://docs.microsoft.com/en-us/style-guide/word-choice/use-us-spelling-avoid-non-english-words
[`remark-preset-lint-node`]: https://github.com/nodejs/remark-preset-lint-node
[plugin]: https://editorconfig.org/#download
[serial commas]: https://docs.microsoft.com/en-us/style-guide/punctuation/commas
