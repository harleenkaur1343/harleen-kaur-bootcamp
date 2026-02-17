## Git & GitHub

**Git** – Upload code in repositories in GitHub, track changes, recover from mistakes, and collaborate. Works through the CLI.  

**GitHub** – GUI platform for code sharing using repositories so others can understand the project and coordinate with the team.

## Setting up SSH
    
SSH (Secure Shell) keys used to establish encrypted tunnel for communication between 2 machines. So in here by setting up ssh for your account you prove your identity to github for performing ops. (Without using passwords).
    
Works on Asymmetric Cryptography. Public key - encrypt, private key - decrypt 
    
**Steps to setup:** 

- Check if you have .ssh file by opening terminal and entering

```markdown
ls ~/.ssh 
```

- If nothing displays, we need to create a key.
    - For creating we will be using command :
        
        ```markdown
        ssh-keygen -t ed25519 -C "youremailforgithub"
        ```
        
    - Passphrase is optional.
    - ed25519 - is the algorithm for creating the keys. ED Edwards-curve Digital Signature Algorithm. 25519 - elliptic curve. Small key size and faster
    - Start the ssh agent
        
        ```markdown
        eval "$(ssh-agent -s)"
        ssh-add ~/.ssh/id_ed25519
        
        ```
        
- If displays id_ed25519 and id_ed25519.pub (public key) then we already have one
- Copy the contents for the public key
cat ~/.ssh/id_ed25519.pub
- Paste the key in Github by going to Settings>SSH and GPG Keys>New SSH Key. Provide a name
- Test from terminal if it is working
    
    ```markdown
    ssh -T git@github.com
    ```
    
    You should get 
    
    Hi username! You have successfully authenticated…
    
- Now we can perform git operations without entering username and password on every operation.


## Configuring the account
    
Added the username and user email globally for git using 

git config —global user.name "myusername”

git config —global user.email “myemail”