## Git & GitHub

**Git** – Upload code in repositories in GitHub, track changes, recover from mistakes, and collaborate. Works through the CLI.

**GitHub** – GUI platform for code sharing using repositories so others can understand the project and coordinate with the team.

### Configuring the account

Added the username and user email globally for git using

- git config —global user.name "myusername”
- git config —global user.email “myemail”

### Git Workflow

    I started by cloning my github repo - git@github.com:harleenkaur1343/harleen-kaur-bootcamp.git

    - git clone [git@github.com](mailto:git@github.com):harleenkaur1343/harleen-kaur-bootcamp.git
    - cd harleen-kaur-bootcamp
    - (git clone automatically initializes the repository and sets origin)
    - git branch (check current branch)
    - git pull origin main (update local main with remote)
    - git switch -c feature/branch-name (create new branch)
    - git status (check repo state)
    - Make changes / create files
    - git add . (stage changes)
    - git commit -m "message" (commit staged changes)
    - git push origin feature/branch-name (push branch to remote)

## grep (Global Regular Expression Print)

- Case sensitive by default find
  - grep “hello” a.txt
  - grep -n “try” a.txt (-n shows the line numbers as well)
  - grep -v INFO log.txt (invert search)
  - grep -i - case-insens
  - grep -w - (exact)
  - grep -E “npm|modul” [install.sh](http://install.sh) (E - regrex)
  - grep -c (counts the matches and returns a number) “word” filename - lines count
  - grep -o “error” install.sh (word count)
    - npm
    - npm
    - npm
  - grep -l ERROR \*.log (searches for ERROR in all .log files and lists their names)
- By file extention
  - rg “function” -tjs (in files with extension)
  - grep -r —include=”\*.js” “function”
- **Ripgrep - does not inspect .gitignore hidden files skipped, by default recursive, fast**
- Exclude few directories from search
  - grep -r --exclude-dir=node_modules "error"

## File permissions

- Permissions model
- User | Group | Others
- rwx r-x (read and execute) r-x
- rwxr-xr-x harleen (user) harleen (group)
- Each has r = 4, w=2 and x=1
- Can be used in modifying permissions using the octal model (numeric permissions )
- chmod 755 [script.sh](http://script.sh) (7 - r=4 + w=2 + x=1), (5 = r=4 + x=1)
- Most used numeric permissions
  - 600 - private file - only owner/user (rw)
  - 644 - normal file - only owner (rw) others read
  - 700 - private dir - only owner access
  - 755 - scripts - can be executed by all written by owner

Logical communication endpoint managed by OS to route the network traffic to a specific process

0 - 65535
Your laptop IP:3000 recieved a request

- network card received data
- Linux kernel read port number
- mapped to process

## Remote SSH VSCode

- Install openssh-server to accept remote connections (Ubuntu VM had SSH CLIENT (for connecting OUT), but needed SSH SERVER (for Windows to connect IN))
  - sudo apt install openssh-server
  - start and enable
    - sudo systemctl enable ssh
    - sudo systemctl start ssh
  - check
    - sudo systemctl status ssh
- Set up port forwarding for SSH on port xxxx
  - Windows localhost:xxxx (above 1024) connected to Ubuntu port 22 (reaches Ubuntu ssh)
- Testing
  - ssh harleen@localhost -p xxxx
- Install Remote SSH on windows VSCode
- Ctrl+Shift+P - Remote-SSH Add Host
  - Created in Users>HP>.ssh>config
    - Host localhost
      HostName localhost
      User :ubuntuname
      Port xxxx
- Ctrl+Shift+P - Remote -SSH: Connect to host
- For password less login
  - ssh-keygen (on win)
  - Copy to ubuntu
    type $env:USERPROFILE\.ssh\id_ed25519.pub | ssh -p xxxx ubuntuname@localhost "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
  - chmod 700 ~/.ssh
    chmod 600 ~/.ssh/authorized_keys (ubuntu)
- Ubuntu authorised keys now contain your windows public key

## JSON/YAML/CSV/.ENV

- When to use JSON, YAML, CSV, and ENV project
  - JSON is used for Structured Data Exchange, for example, with APIs and in app files like package.json.
  - YAML is used for human-readable configuration, like in DevOps.
  - .env files are used for storing environment-specific variables and secrets which are not hard coded into the source code.
  - CSV is used when you need to store the data in a structured way using rows and columns in tabular form for analytics and other reports.
