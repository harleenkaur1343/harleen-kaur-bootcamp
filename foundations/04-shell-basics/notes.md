## File location - /home/harleen/work/data-playground

File - demo.txt 

1. How many lines? : 60
2. How many contain a specific word? 
    - Seached for word "clock" which is present in 4 lines 
    ```markdown
    grep -i "clock" demo.txt | wc -l
    ```
3. What are the first 5 lines?
    - The clock on the wall ticks steady and slow
    - The clock on the wall has nowhere to go
    - We wait for the morning to break through the grey
    - We wait for the morning to start a new day
    - In the heart of the city the iron wheels turn

     ```markdown
    head -n 5 demo.txt
    ```

4. What are the last 5 lines?
    - We wait for the morning to start a new day
    - Step by step we follow the line
    - Step by step we measure the time
    - The end is a beginning or so they say
    - The end is a beginning starting today
    ```markdown
    tail -n 5 demo.txt
    ```
5. WHy rm -rf dangerous?
    - rm - removes 
    - r - recursivelu (all content inside the path)
    - f - force (without confirming)

    ```markdown
    rm -rf * (deletes everything from current directory : / - root : use ./ (current directory for folders to be deleted))
    ```


