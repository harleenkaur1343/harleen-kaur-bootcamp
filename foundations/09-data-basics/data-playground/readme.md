## JSON/YAML/CSV/.ENV
- When to use JSON, YAML, CSV, and ENV project
  - JSON is used for Structured Data Exchange, for example, with APIs and in app files like package.json.
  - YAML is used for human-readable configuration, like in DevOps.
  - .env files are used for storing environment-specific variables and secrets which are not hard coded into the source code.
  - CSV is used when you need to store the data in a structured way using rows and columns in tabular form for analytics and other reports.

- Why YAML is good for configs
  - Made for human understanding first
  - **Supports comments**, which helps document configuration.
  - Simple data representation using indentation and without brackets

- Why secrets belong in .env
  - Prevents hardcoding sensitive values in source code which can be succeptible to attacks.
  - Keeps secrets out of version control (via .gitignore)

- What each file contains
    - samples.json - File  contains the person object, further containing info as an object
    - config.yaml - this file contains the converted version of samples.json in YAML format.
    - The.env file contains the port number, and it is not being tracked as it is there in the.gitignore file.
    - samples.csv - contains the name, agent, city data, separated by commas, like written in the CSV format.