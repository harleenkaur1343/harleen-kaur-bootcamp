### 3 useful shortcuts

- Ctrl + Shift + F : Find in files
- Ctrl + L : Select whole line
- Ctrl + / : Line comments

### 3 useful settings

- formatOnSave → Automatically formats code on save
- autoSave
- word wrap

### 2 extensions

- Prettier
- Tailwind CSS IntelliSense

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