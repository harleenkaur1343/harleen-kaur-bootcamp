## Modules 
- Common JS and ES Modules
  
  **Common JS** - 
  
  - Node’s original module system
  - Loads modules dynamically at runtime - even inside the if statements - **loads synchronously which is blocking**
  
- ESModules 
  - import {express} from ‘express’ -
  - export function fetchUser() {}
  - Imports are static and at top of the file - no dynamic loading
  - Known at compile time as they are static, bundlers can analyse exactly what to use and drop the rest
  - CJS - is dynamic so they have to include everything
  - TypeScript and your IDE can better understand static imports, giving smarter autocomplete and catching errors earlier.
  - Loads asynchronously (non-blocking)
  - In package.json - “type” : “module” and in tsconfig.json - module : ESNext
- Private registries and scoped packages
  
  **Scoped Packages** 
  
  - Packages which belong to a org or a user
  - prefixed with @ - like types/node - @company/ui-librry
  - @scope - groups the related packages, prevents naming conflicts
  - For eg 2 companies have same utils package but can diff using @com1/utils and @com2/utils
  
  **Private registries**
  
  - By default pnpm pulls packages from the public npm registry (registry.npm.org)
  - For company internal packages, are hosted in private registries (not puclic)
  - .npmrc - config file which tells pnpm from where to download the packages, npm register and the website links for a scoped package
  - 
      
      ```markdown
      .npmrc
      registry=https://registry.npmjs.org          # default public registry
      tell pnpm to fetch @mycompany packages from private registry
      @mycompany:registry=https://npm.mycompany.com 
      auth token for private registry
      [//npm.mycompany.com/:_authToken=your-secret-token](https://npm.mycompany.com/:_authToken=your-secret-token)
      ```
      
- Monorepos
  
  Monorepo - single git repo contains multiple packages 
  
  - polyrepo
  - github/mycompany/frontend     ← separate repo
  github/mycompany/backend      ← separate repo
  github/mycompany/ui-library   ← separate repo
  github/mycompany/shared-types ← separate repo
  
  - Monorepo
  - github/mycompany/everything
  packages/
  frontend/
  backend/
  ui-library/
  shared-types/
  
  Benfits of monorepos 
  
  - Shared code for frontend and backend
  - No need to coordinate changes across multiple repos
  - One eslint config, one TypeScript config, one CI pipeline for everything.
  
  Cons
  
  - Large size
  - Complex struct
