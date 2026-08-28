# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [0.24.0](https://github.com/wgalleti/wPrimeVueComponents/compare/v0.23.0...v0.24.0) (2026-08-28)

### Funcionalidades

* **tab-nav:** group colors and per-tab options button ([ed7379b](https://github.com/wgalleti/wPrimeVueComponents/commit/ed7379b7f874b0e9edfab0360fed4bd7519ae248))

### Correções

* **form:** skip hidden fields in validation ([a817c5b](https://github.com/wgalleti/wPrimeVueComponents/commit/a817c5bc0a4bc451bda43ad0b5618c2332a36802))
## [0.23.0](https://github.com/wgalleti/wPrimeVueComponents/compare/v0.22.3...v0.23.0) (2026-08-27)

### Funcionalidades

* **map-select:** add zoom-aware polygon labels (tooltips="auto") ([2f130be](https://github.com/wgalleti/wPrimeVueComponents/commit/2f130bef696e89c1e518aef9d136c60aed6e86aa))
## [0.22.3](https://github.com/wgalleti/wPrimeVueComponents/compare/v0.22.2...v0.22.3) (2026-08-26)
## [0.22.2](https://github.com/wgalleti/wPrimeVueComponents/compare/v0.22.1...v0.22.2) (2026-08-26)

### Correções

* widen vue-router peer range to accept v5 ([afd0605](https://github.com/wgalleti/wPrimeVueComponents/commit/afd0605a1ba642ded2b1fcbcf7e5b3eeb84ecfb3))
## [0.22.1](https://github.com/wgalleti/wPrimeVueComponents/compare/v0.22.0...v0.22.1) (2026-08-25)

### Correções

* **tab-nav:** contain in-tab overlays below out-of-tab chrome ([5a0ebe9](https://github.com/wgalleti/wPrimeVueComponents/commit/5a0ebe99b5beb3fa5bb1b142bef927d3a1379d83))
## [0.22.0](https://github.com/wgalleti/wPrimeVueComponents/compare/v0.21.0...v0.22.0) (2026-08-25)

### Funcionalidades

* **chart:** WChart wrapper for Apache ECharts ([f7e2657](https://github.com/wgalleti/wPrimeVueComponents/commit/f7e265777cbcbd27f01b3c7a0d0a5d881ec54d5a))
## [0.21.0](https://github.com/wgalleti/wPrimeVueComponents/compare/v0.20.0...v0.21.0) (2026-08-24)

### Funcionalidades

* **editable-table:** header column groups via ColumnDef.group ([94ebf47](https://github.com/wgalleti/wPrimeVueComponents/commit/94ebf47af2455e4738145273a4de3bf3f9257065))
## [0.20.0](https://github.com/wgalleti/wPrimeVueComponents/compare/v0.19.0...v0.20.0) (2026-08-22)

### Funcionalidades

* **map-select:** slot-driven detail card, feature-click and featureLabel ([ca6dd18](https://github.com/wgalleti/wPrimeVueComponents/commit/ca6dd18b53278d1030c753964ef5d1bef4c4503b))
## [0.18.0](https://github.com/wgalleti/wPrimeVueComponents/compare/v0.17.0...v0.18.0) (2026-08-20)

### Funcionalidades

* **tabs:** page-enter animation on WTabViewport panes ([c73cb16](https://github.com/wgalleti/wPrimeVueComponents/commit/c73cb1689487088955b3ec1174a347e3474aea15))
## [0.17.0](https://github.com/wgalleti/wPrimeVueComponents/compare/v0.16.0...v0.17.0) (2026-08-19)

### Funcionalidades

* **dialogs:** WDialog and pane-anchored confirmations ([77ba9fc](https://github.com/wgalleti/wPrimeVueComponents/commit/77ba9fcb79865dc60d8d5c6921021e3678d490ac))
* **tabs:** mode 'module' — one tab per menu entry with in-tab navigation ([0453b9f](https://github.com/wgalleti/wPrimeVueComponents/commit/0453b9ff92427d19d21a7549ac14da2a3cfb155f))
* **WMapSelect:** featureStyle to highlight polygons by their own data ([a46e15c](https://github.com/wgalleti/wPrimeVueComponents/commit/a46e15c7fe31df853de29f4530e30d9852bd22f6))
## [0.16.0](https://github.com/wgalleti/wPrimeVueComponents/compare/v0.15.0...v0.16.0) (2026-08-19)

### Funcionalidades

* **dialogs:** anchor suite dialogs to the tab pane via useTabHost ([7e2ea13](https://github.com/wgalleti/wPrimeVueComponents/commit/7e2ea132b76bd4e778bbc31e4f37e3d8b00dd5b8))
* **tabs:** route tab navigation (useRouteTabs, WTabNav, WTabViewport) ([2fa1152](https://github.com/wgalleti/wPrimeVueComponents/commit/2fa115277507365aaf54f2a3e8ad3ed815ce19a4))
## [0.15.0](https://github.com/wgalleti/wPrimeVueComponents/compare/v0.14.0...v0.15.0) (2026-08-17)

### Funcionalidades

* **crud:** fetchDetailOnEdit option and row selection surface on WCrudView ([7b73b66](https://github.com/wgalleti/wPrimeVueComponents/commit/7b73b66bde42455bbc9b1a55532f9ee6be0ce4db))
* **WMapSelect:** canvas renderer, incremental diff, readonly selection and fit controls ([416fa0e](https://github.com/wgalleti/wPrimeVueComponents/commit/416fa0e13ef504bdf7fb62e7d6aae4cb8d5fd7d9))
## [0.14.0](https://github.com/wgalleti/wPrimeVueComponents/compare/v0.13.0...v0.14.0) (2026-08-15)

### ⚠ BREAKING CHANGES

* **WEditableTable:** passing `disabled` no longer disables the remove button.

### Funcionalidades

* **tables:** striped rows and row hover as suite defaults ([61d6f34](https://github.com/wgalleti/wPrimeVueComponents/commit/61d6f34751c31c74e1a72ca60d453bdb876a80d9))
* **WCrudSubview:** CRUD for draft child collections ([6e99e4b](https://github.com/wgalleti/wPrimeVueComponents/commit/6e99e4b0bf1fb8f13208c1f298bba5219cc1be21))

### Correções

* **WEditableTable:** disabled no longer blocks row removal ([cac39f8](https://github.com/wgalleti/wPrimeVueComponents/commit/cac39f8bee0ec6e57d5353e102b7e4c01e952592))

### Refatorações

* **useCrudManager:** extract form rules into utils/formRecord ([366219b](https://github.com/wgalleti/wPrimeVueComponents/commit/366219bdbd650f7354441a8656dab58752940559))
## [0.13.0](https://github.com/wgalleti/wPrimeVueComponents/compare/v0.12.0...v0.13.0) (2026-08-13)

### Funcionalidades

* **WMapSelect:** prop readonly para exibir geometrias sem seleção ([3abdb47](https://github.com/wgalleti/wPrimeVueComponents/commit/3abdb479fffa222bf1d28fdc5a77495f9aee85c3))

### Documentação

* página do WDatePicker e gate de checklist no CI ([a135ca5](https://github.com/wgalleti/wPrimeVueComponents/commit/a135ca59d3b5f68d4e2fd29215ba0542196a9fa9))
* páginas VitePress dos 5 componentes do 0.12.0 ([ed53237](https://github.com/wgalleti/wPrimeVueComponents/commit/ed53237a53f323e737f67833272a83768c264c1d))
## [0.12.0](https://github.com/wgalleti/wPrimeVueComponents/compare/v0.11.0...v0.12.0) (2026-08-13)

### Funcionalidades

* leitor de markdown rico, board kanban e barra de abas ([0d06eeb](https://github.com/wgalleti/wPrimeVueComponents/commit/0d06eebb69b9fb1779f906136fcc9348028ae8cb))
## [0.11.0](https://github.com/wgalleti/wPrimeVueComponents/compare/v0.10.0...v0.11.0) (2026-08-11)

### Funcionalidades

* **WAutoCompleteFK:** sub-linhas com colunas dinâmicas no modal de pesquisa ([8d2712f](https://github.com/wgalleti/wPrimeVueComponents/commit/8d2712f734804cb1d9313d020cd73150ad0b1301))
## [0.10.0](https://github.com/wgalleti/wPrimeVueComponents/compare/v0.9.6...v0.10.0) (2026-08-06)

### Funcionalidades

* **WTreeSelect:** seleção múltipla em árvore com checkbox a partir de lista plana ([c9025cb](https://github.com/wgalleti/wPrimeVueComponents/commit/c9025cb89a50087dfac574428808b4089d2c26b6)), references [primefaces/primevue#6928](https://github.com/wgalleti/wPrimeVueComponents/issues/6928)
## [0.9.6](https://github.com/wgalleti/wPrimeVueComponents/compare/v0.9.5...v0.9.6) (2026-08-04)

### Funcionalidades

* **WAutoCompleteFK:** limpar seleção e chips que respeitam a largura do campo ([3b2be0e](https://github.com/wgalleti/wPrimeVueComponents/commit/3b2be0eb394f608319af506ffa5d5ba1cd4d224a))
* **WAutoCompleteFK:** seleção múltipla (chips + marcação no modal) ([9efa96c](https://github.com/wgalleti/wPrimeVueComponents/commit/9efa96cf5ea0f238978dc9f8834d28c32ff716c0))

### Correções

* **WAutoCompleteFK:** alinhamento do ícone, quebra de linha e chip que abre a listagem ([ea21d60](https://github.com/wgalleti/wPrimeVueComponents/commit/ea21d60a5e0b8645e01e54c1b384cba88bd94f6e))
## [0.9.5](https://github.com/wgalleti/wPrimeVueComponents/compare/v0.9.4...v0.9.5) (2026-08-03)

### Funcionalidades

* **WCrudView:** persiste o modo de visualização por grid (opt-in persistState) ([98bb6f5](https://github.com/wgalleti/wPrimeVueComponents/commit/98bb6f554c2e1b6b4b7ddd71dd2fe4c874264e78))
* **WCrudView:** slot `card` p/ card totalmente customizável no modo cards ([6f6fa8b](https://github.com/wgalleti/wPrimeVueComponents/commit/6f6fa8b22abbc4bb5dca8a7e3f535c7c760602fc))
## [0.9.4](https://github.com/wgalleti/wPrimeVueComponents/compare/v0.9.3...v0.9.4) (2026-08-03)

### Funcionalidades

* **WAutoCompleteFK:** create inline herda o pai da cascata (dependsOn) ([7a7e842](https://github.com/wgalleti/wPrimeVueComponents/commit/7a7e842178a132f5ce822d4c36b779b7b4839169))
## [0.9.3](https://github.com/wgalleti/wPrimeVueComponents/compare/v0.9.2...v0.9.3) (2026-08-03)

### Correções

* **useCrudManager:** createDefaults não sobrescreve valor editável no submit ([ac7a5e3](https://github.com/wgalleti/wPrimeVueComponents/commit/ac7a5e3d02f4bd5530129af8d7859aa5653ae6ee))
## [0.9.2](https://github.com/wgalleti/wPrimeVueComponents/compare/v0.9.1...v0.9.2) (2026-07-31)

### Funcionalidades

* **WCrudView:** slot delete-message no diálogo de exclusão + performDelete no useCrudManager ([4bac5ca](https://github.com/wgalleti/wPrimeVueComponents/commit/4bac5ca0a21ced6de6696f1627ef5f5fb3ee81cb)), references [#delete-message](https://github.com/wgalleti/wPrimeVueComponents/issues/delete-message)
## [0.9.1](https://github.com/wgalleti/wPrimeVueComponents/compare/v0.9.0...v0.9.1) (2026-07-31)

### Correções

* **WFormRenderer:** campo calculado não reagia no fluxo do WCrudFormDialog ([23d00c7](https://github.com/wgalleti/wPrimeVueComponents/commit/23d00c71dc83c6dca3ed241beaea9300706d7345))
## [0.9.0](https://github.com/wgalleti/wPrimeVueComponents/compare/v0.8.3...v0.9.0) (2026-07-31)

### Funcionalidades

* **WFormRenderer:** campos calculados, endpointParams por função e toggles de CRUD inline na FK ([551ac15](https://github.com/wgalleti/wPrimeVueComponents/commit/551ac15bdff3110c9c8f6efb3891bb8a95943531))
## [0.8.3](https://github.com/wgalleti/wPrimeVueComponents/compare/v0.8.2...v0.8.3) (2026-07-30)

### Correções

* **form:** FK honra autofocus e evita o Dialog roubar foco para o botão fechar ([14efacc](https://github.com/wgalleti/wPrimeVueComponents/commit/14efacc82cbf8be8c9f0fb1da831d7d42575651c))
## [0.8.2](https://github.com/wgalleti/wPrimeVueComponents/compare/v0.8.1...v0.8.2) (2026-07-30)

### Funcionalidades

* **dx:** CLI de integração (init) + skill do Claude Code ([aabaf3c](https://github.com/wgalleti/wPrimeVueComponents/commit/aabaf3c5d10be0ca54b22e9351d3c28e713f8272))
## [0.8.1](https://github.com/wgalleti/wPrimeVueComponents/compare/v0.8.0...v0.8.1) (2026-07-30)

### Funcionalidades

* **autocomplete-fk:** navegação por teclado no modal de busca ([29a7471](https://github.com/wgalleti/wPrimeVueComponents/commit/29a747122e5416d91a84205fddf57b735a1c8eab))
* **form:** navegação por teclado estilo desktop (keyboardNav) ([15fef3f](https://github.com/wgalleti/wPrimeVueComponents/commit/15fef3fcc78e224e95c02f56c38054d0672dd60f))
* **form:** WDatePicker — campo de data pt-BR padronizado ([f2ea726](https://github.com/wgalleti/wPrimeVueComponents/commit/f2ea726f89d52558014ff10d3a4097f0c4ebda4a))
## [0.8.0](https://github.com/wgalleti/wPrimeVueComponents/compare/v0.7.1...v0.8.0) (2026-07-30)

### Funcionalidades

* componentes novos — WDateRange, WFileUpload + defineCrudConfig<T> (Track D) ([7f3e3dd](https://github.com/wgalleti/wPrimeVueComponents/commit/7f3e3dd7fe4582c1538f7300de5301eac1449916))
* **crud:** edição inline por célula (editMode: 'cell') ([4b716ba](https://github.com/wgalleti/wPrimeVueComponents/commit/4b716baafbddb5412ac5d109f44ee4753c0a37e6))
* **crud:** seletor de colunas + persistência de visibilidade (persistState) ([0e885c6](https://github.com/wgalleti/wPrimeVueComponents/commit/0e885c631004a272d92ca92eda8b1cbb1a4e0a6d))
## [0.7.1](https://github.com/wgalleti/wPrimeVueComponents/compare/v0.6.1...v0.7.1) (2026-07-30)

### Funcionalidades

* **crud:** filtro declarativo por coluna (opt-in) ([c7c80f2](https://github.com/wgalleti/wPrimeVueComponents/commit/c7c80f25d3ea93f77545856017d7ec3c084ff167))
* **crud:** seleção múltipla + ações em lote (opt-in) ([84f32e6](https://github.com/wgalleti/wPrimeVueComponents/commit/84f32e6a2ef64dfd2fbb7cc143e00a0976a5b033))
* **docs:** pipeline de metadata (fonte única) + ApiTable ([96ef971](https://github.com/wgalleti/wPrimeVueComponents/commit/96ef97132c2bd6e8bba7e9c819d9a2f0f67b00eb))
* Movimento 1 — fundação da lib (WImageCropper, exports, tooling) ([6f22808](https://github.com/wgalleti/wPrimeVueComponents/commit/6f2280824194d5e708b51640979724fd536aa688))
* **playground:** ComponentWorkbench — doc viva dos componentes ([0a9259c](https://github.com/wgalleti/wPrimeVueComponents/commit/0a9259c89ef2c4ef38e56bdafcac6eb0eb8e011e))
* sidecars de metadata dos 17 componentes restantes ([c4923c9](https://github.com/wgalleti/wPrimeVueComponents/commit/c4923c9862e91c2a7f624f1d5bc8a73a8fa61254))

### Documentação

* <ApiTable> em todas as docs + páginas faltantes + sidebar por categoria ([7a0c08f](https://github.com/wgalleti/wPrimeVueComponents/commit/7a0c08f1155ed3e9881e826eed252a5a0264001f))
