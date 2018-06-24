# Cron-Experimentation
Building a flexible parser for a cron input string

## Build Status
| Master  |  Develop |
|---|---|
| [![CircleCI](https://circleci.com/gh/j-c-levin/cron-experimentation/tree/master.svg?style=svg)](https://circleci.com/gh/j-c-levin/cron-experimentation/tree/master)  |  [![CircleCI](https://circleci.com/gh/j-c-levin/cron-experimentation/tree/develop.svg?style=svg)](https://circleci.com/gh/j-c-levin/cron-experimentation/tree/develop) |

# Parser scope

This parser implements all the basic inputs for a cron format following the linux specification:

http://man7.org/linux/man-pages/man5/crontab.5.html

### Future work

* Handle ```@yearly``` or other shorthand commands

* There's a lot of repetition, potentially create a 'generic matcher' that handles all the common matches?

* Handling steps and 'any' symbols are a bit thrown in at the moment, consider if there is a more abstracted way of breaking that down.

* There's a lot of repetition in some of the straight number parsers, could make this a more abstracted class that is inherited.

# Installing
1) Download node

* https://nodejs.org/en/

2) Clone or download this repository and unzip

3) In the command prompt or terminal navigate into the folder and install dependencies

* ```npm install```

# Running 

1) Navigate into the project directory in the command prompt or terminal

2) Run the parser with a cron string

* The format is ```npm run start [minute] [hour] [day-of-month] [month] [day-of-week] [command]```

* ```npm run start */15 0 1,15 * 1-fri /usr/bin/find```

![Example Output](https://i.imgur.com/AgNyjd3.png "An image of a command prompt window displaying a successfully parsed cron string")

3) Optionally, run the parser in watch mode

* ```npm run start:watch */15 0 1,15 * 1-fri /usr/bin/find```

# Testing

1) Navigate into the project directory in the command prompt or terminal

2) Run the tests

* ```npm run test```

![Example Test Output](https://i.imgur.com/boDgPvj.png "An image of a command prompt window running the tests")

3) Optionally,you can run the tests in watch mode

* ```npm run test:watch```