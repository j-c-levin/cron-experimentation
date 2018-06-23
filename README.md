# Cron-Experimentation
Building a flexible parser for a cron input string

## Build Status
| Master  |  Develop |
|---|---|
| [![CircleCI](https://circleci.com/gh/j-c-levin/cron-experimentation/tree/master.svg?style=svg)](https://circleci.com/gh/j-c-levin/cron-experimentation/tree/master)  |  [![CircleCI](https://circleci.com/gh/j-c-levin/cron-experimentation/tree/develop.svg?style=svg)](https://circleci.com/gh/j-c-levin/cron-experimentation/tree/develop) |

# Installing
1) Download node

* https://nodejs.org/en/

2) Clone or download this repository and unzip

3) In the command prompt or terminal navigate into the folder and install dependencies

* ```npm install```

# Running 

1) Navigate into the project directory in the command prompt or terminal

2) Run the parser with a cron string

* ```npm run start */15 0 1,15 * 1-fri /usr/bin/find```

![Example Output](https://i.imgur.com/AgNyjd3.png "An image of a command prompt window displaying a successfully parsed cron string")