## Tags and release
    
Release - stable working snapshot of your project that you mark at a specific commit using a tag 

- v0.1.0 - first usable version
- v1.0.0 - stable version
- v1.1.0 - new feature added
- Release consists of
    - a tag
    - a release description
    - assets/binaries (optional)
- Release marks - tested, production ready version of your app
- When code breaks, we can safely revert to a stable release instead of rolling back commits
- No developers don’t clone, they download app from releases
- **Creating a tag**
    
    ```markdown
    git tag v0.1.0 (first  usable) - by default on head, refers to latest commit 
    git tag v0.1.0 <commithash>
    
    #Annotated 
    git tag -a v0.1.0 -m "First usable version"
    
    git push origin v0.1.0
    
    ```
    
- Creating a release
    - From Git CLI
        
        gh release create v0.1.0
        
    - From github in tags/releases → Create a new release → Select a tag → Add title and description → Create (set as pre release optional)
        - After creation, the zip file for your code is created which can be downloaded


## Semantic Versioning (1.0.0) means
    
MAJOR.MINOR.PATCH

v2.4.1

**Major:** Increment major - for big changes like in backend where the change might cause the current version to break 

- api add/remove
- renaming function
- changing function arguments

v1.5.2 → v2.0.0

**Minor :**  For feature updates which do not break the existing code 

- Performance improvement
- Optional params

v1.5.2 → v1.6.0 

**Patch :**  Bug fixes, typos, security fixes

- v1.5.2 → v1.5.3

Alpha - early n unstable 

- v2.0.0-alpha.1

Beta - feature completed, testing 

- v2.0.0-beta.2

rc - Release candidate - almost production ready 

- v2.0.0-rc.1