
Version number: 5b8d0fd276b6d288905ed2f63a934e057e8feca2

# How to work with app

## Description

EE simple application

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Production deployment

On production .env file should be created based on .test.env

# Analyzes

I spent in the meantime about 0,5h before starting the coding on the project analysis and did below notes.

## Note about last approach
I did a first try to the exercise here: https://github.com/piotrduszynski-besolve/ee-calculator

I decided to try again with a different approach, as I spend to much time on setup the project tech stack. I decided to build a project based on nestjs, which speeds up the development phase significantly, thanks to build-in generators for setup projects and project files.
## Product Analyzes
### Business requirements
#### Product requirements
- Calculator should be attractive
    - ASCI Art in JSON
    - Web calculator
- Equal Expert Branding
    - Branding in JSON
    - Image
- Feature expected from the simple pocket calculator:
    - sum, subtract, divide, multiplication
    - order of operations execution
    - easy way to input an equation
    - integer and floating
    - 10? chars of precision(is there a limitation for number?)
    - clear input
#### Technical Requirements
- coding exercise no more than 90 minutes, code like for the paying client - what compromises I would take.
    
     I decided to split time into 15 minutes sessions maximum. To keep on track of what progress I made and do I need to change a plan o execution.
- Required: Test Coverage, Simplicity, Self-explanatory code
- Include Readme 
- Include the Version number

### How to deliver business value quickly
- Calculation backend endpoint in the first stage
- 3rd party calc - https://mathjs.org/, https://nerdamer.com/ , https://www.npmjs.com/package/static-eval
- eval could be used to calc equation from a string, but executing JavaScript from a string can lead to an enormous security risk.
- ASCI Art -> Equal Expert Branding
- Server rendered calc webpage
- nestjs as framework - easy and quick to use, embedded server rendering, build in generator for project and files

### Risks
- Small amount of time -> 15 minutes coding sessions
- The small amount of time can lead to problems with the implementation of 2 important tasks(in my opinion):  
  - deployment
  - product analytics/metrics

### Story Mapping - plan of work
|**ID**|**Input Equation**            | **Calculate**         | **Display Result**         | **Memorize Equation** | **Clear** |
|------|------------------------------|-----------------------|----------------------------|-----------------------|-----------|
|1     |Endpoint to send equation     | Basic operations(+,-) | Add branding - JSON        |                       |           |
|1.2   |Validate input string + trim  |                       | Add branding - ASCI art    |                       |           |
|3     |                              | Basic operations(*,/) |                            |                       |           |
|3.1   |                              |   Order of operations |                            |                       |           |
|3.2   |                              |   Divide by 0         |                            |                       |           |
|4     |                              |                       | HTML page + branding image |                       |           |
|5     |Home page with equation input |                       |                            |                       |           |

### Technology stack
#### CI
- husky + nestjs
- Create app artifacts using Github Releases
- When MVP is created, think about adding Github action for CI
- When MVP is created, think about the creation of an artifact as a Docker image in GitHub Container Registry
#### CD
- Manual release to AWS Lightsail
- When MVP is created, add deployment via AWS Pipeline
- When MVP is created, add IaC
### Product Monitoring
 - When MVP is created, add Mixpanel
 
## Session Notes
### 1 Add Nestjs + Husky(4 minutes)
- The same functionalities as with manual initialization from the last approach + TS + Prittier and more
### 2 Added equation input (13 minutes)
- I generated controller and interfaces for calculator data - a quick one to do
### 3 Added Json Branding (14 minutes)
- I needed to read about handling configuration in nestjs
### 4 Fixed E2E Test (4 minutes)
### 5 Sum and minus operation(16 minutes)
- I wanted to write calc from scratch, but I realized it's risky in 90 minutes to deliver product value for you.
- Decided to use Mathjs
- Updated stories
### 6 Equation validator + calculation service(35 minutes)
- I had a problem with mocking. I decided to use a different approach with module providers
- Problem with one line regex for the equation.
- Simple task changed in some refactoring and additional tasks.
- Equation input is returning a number. That should be changed to string.
- I'll decide to skip ASCII art implementation
### 7 Add multiplication and division(30 minutes)
- Some problems with tests that throws exception for Infinity.
- There was a need to add Infinity handling for dividing by zero. It's how it works in Math.js. I needed to  read about it
- Concentration was not so good as at the beginning

## Retrospective

- After about an hour I started to feel a degradation of concentration. It's not efficient to work this way for long-term development. I decided to split an exercise into sessions, and between them try to write notes and rethink the coding approach, which finally end up in 2h exercise on a high concentration level. On the other hand, sessions helped me to decide on how to progress and rethink the current approach.
- Preparing a plan(story mapping) beforehand was the bull's eye. It gave me the ability to focus on development.
- Nestjs was a risky choice as I'm not very experienced in it. Any mistake or bigger problems could lead to time waste. However build-in generators save me a lot of time.
- Time was very short, so I think the code would require some refactoring(name changes, and maybe some simplifications)


