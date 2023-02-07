

##Javscript component-scanning requirements
#

this software supports JavaScript and Node.js source codes based on NPM, Yarn, Pnpm and Bower.

| tool  | repository scanning                 | CI/CD scanning                      |
| ----- |:------------------------------------| :-----------------------------------|
| npm   | `package.json`, `package-lock.json` | `package.json`, `package-lock.json` |
| yarn  | `yarn.lock`                         | `package.json`, `yarn.lock`         |
| Pnpm  | -                                   | `pnpm-lock.yaml`                    |
| Bower | `bower.json`                        | -                                   |
