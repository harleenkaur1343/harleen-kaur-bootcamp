## Running processes
- /usr/bin/gnome-calendar - user process, gui app
    - usr : User applications
    - bin : Binary (complied programs)
    - usr/bin - root of ubuntu, accessible from anywhere.
        - Has system binaries - installed by apt install
        - Programs : node, npm , git
    - gnome : Desktop environment on Ubuntu - VM screen
- /opt/google/chrome/chrome - google chrom binary
    - opt - third party software
- sbin/init splash
    - First process which is started by linux
    - Parent of all processes
    - splash - Graphical boot screen instead of logs (purple screen loading)

## Permissions change
- Removed the execute permission for a directory newfolder - Showed permissions denied on cd newfolder

## Error on port already in use
  ```markdown
  File "/usr/lib/python3.10/socketserver.py", line 466, in server_bind
    self.socket.bind(self.server_address) OSError: [Errno 98] Address already in use
    ```


## File permissions
- Permissions model
    - User | Group | Others
    - rwx   r-x (read and execute) r-x
    - rwxr-xr-x harleen (user) harleen (group)
    - Each has r = 4, w=2 and x=1
- Can be used in modifying permissions using the octal model (numeric permissions )
    - chmod 755 [script.sh](http://script.sh) (7 - r=4 + w=2 + x=1), (5 = r=4 + x=1)
    - Most used numeric permissions
        - 600  -  private file  -  only owner/user (rw)
        - 644  -  normal file  -  only owner (rw) others read
        - 700  -  private dir  -  only owner access
        - 755  -  scripts       -   can be executed by all written by owner
- Symbolic model
    - u - user
    - g - group
    - o - other
    - a - all
    - Operators
        - + (add)
        - - (subtract)
        - = (set)
    
    Adding execute permissions for owner 
    
    ```markdown
    chmod 600 script.sh
    chmod u+x script.sh
    ```
    
    Give read to everyone 
    
    ```markdown
    chmod a+r file.txt or chmod +r file.txt
    ```
    
    Set different permissions for everyone 
    
    ```markdown
    chmod u=rwx, g=rx, o=r file
    ```
    
- Permissions context for files and directory
    
    
    | Permission | File | Directory |
    | --- | --- | --- |
    | r | Read contents | List the contents (ls) |
    | w | Modify contents | Create, delete, rename files/folders in the directory  |
    | x | Rum as script/program | Enter directory and access items inside (cd dir). You need **execute (`x`) on every directory in the path**: (for a sub folder) |

## Process
    
Program which is running

Whatever you open becomes a process eg. VSCode, Chrome, etc

To check all processes running 

```markdown
ps aux 

#Live system monitor 
top and htop
```

To find a app

```markdown
px aux | grep node
ps -u $USER
```

To kill a process 

```markdown
kill pid (Allows cleanup, resources close, saves files) Signal - SIGTERM (
pkill node (parent n child processes)
kill -9 PID (forced kill) SIGKILL - Signal - app froze
```

**Zombie processes** 

Process which have finished by exit status was not read by parent - Z (kill parent)

R - Running - Using CPU 

S - Sleep - Waiting

D - Uninterrupted sleep - Waiting for disk (I/O)

T - Stopped - paused

Z - Zombie - Dead but not cleared