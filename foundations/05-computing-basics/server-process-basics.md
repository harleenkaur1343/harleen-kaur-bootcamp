## Simulate real debugging:

1. Start a server on any port 
    - python3 -m http.server 8000
2. From another terminal, find:
    1. The process ID - 13581
    2. The command that started it - python3 -m http.server 8000
    3. Which user owns it - harleen
    4. Verify the server works in a browser
    5. Kill the process and verify the port becomes free. - kill pid (refused to connect in browser)
3. Restart it on a new port (e.g., 7000)