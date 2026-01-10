# 📋 Roadmap

## 💻 UI/UX Improvements

- [ ] Implement TOC
- [ ] Formatting issue with parsing integers - currency gets truncated
- [ ] Typography not consistent enough
- [ ] Add smart search dictionary for slugs and abbreviations
- [ ] Upload xlsx/csv files in page to produce mdx code to copy and insert it to the page

<details>
    <summary>✅ Completed tasks</summary>

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
TypeScript                      60            506             45           5028
Markdown                        36            379              0            980
CSS                              1             21              3            146
JSON                             3              0              0            127
YAML                             1              8              0             35
-------------------------------------------------------------------------------
SUM:                           101            914             48           6316
-------------------------------------------------------------------------------
```

My team would like to change the routing structure logic to use a more efficient approach and less complex than the existing one.
Right now we are looking forward to moving the directory `content` to be called `docs`, and the content/docs mdx files will be moved to the root of the new `docs` directory. So this structure will shape the code in a way where when the pages loads, it will check first inside this new `docs` folder if there's a file with the same name as the last segment of the URL, if it does, it will render the content of that file, otherwise check subdirectories names of new `docs` folder, those subdirectories will be checked in a depth-first manner, they are referenced as "ese" which stands for "entreprise", meaning that they will have different names.

