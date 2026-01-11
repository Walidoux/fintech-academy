# 📋 Roadmap

## 💻 UI/UX Improvements

- [ ] Add motion/motion-solid to animate transitions between routes
- [ ] Add empty illustration if mdx of route has no content
- [ ] Add [lighthouse](https://github.com/marketplace/actions/lighthouse-ci-action) in github actions
- [ ] Formatting issue with parsing integers - currency gets truncated
- [ ] Add smart search dictionary for slugs and abbreviations
- [ ] Typography not consistent enough
- [ ] Upload xlsx/csv files in page to produce mdx code to copy and insert it to the page

<details>
    <summary>✅ Completed tasks</summary>

- [x] Add skeletons as loading states and load page as soon as possible
- [x] Implement TOC (Table Of Contents)
- [x] Disallow routes from both URL redirections and navigations
- [x] Add search bar to look up text matches + magic keys ctrl+k
- [x] Add DataTable component
- [x] In dev mode only, add button to go file using preferred IDE
- [x] Add breadcrumbs to each subpage
- [x] Add doc footer pagination (next/previous) pages
- [x] Add custom checkbox for mdx
- [x] Pagination issues with routes (#how-it-works, #faq) and other subpages of categories links
- [x] Add status production page to navigation bar
- [x] Code callouts, code can be grabbed from catalog manager of rypi-ui for instance
- [x] Fix deployement workflow after migrating to SolidStart
- [x] Beautify scrollbar styles

</details>

## 📜 Content

### Généralités

- [ ] Consulter les normes comptables/financières (IFRS & IAS)

### Manar Conseil

- [ ] Concevoir un organigramme dans le but d’une analyse managériale

<details>
    <summary>✅ Completed tasks</summary>

- [x] Docs can be found under "rapport de stage" in figma and anything related

</details>

## 📝 Code written

`cloc . --exclude-dir="node_modules,.content-collections,.vinxi,.output,public"`

```bash
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
TypeScript                      65            625            116           5901
Markdown                        36            409              0           1292
CSS                              1             21              3            148
JSON                             3              0              0            136
YAML                             1             16              0             69
-------------------------------------------------------------------------------
SUM:                           106           1071            119           7546
-------------------------------------------------------------------------------
```
