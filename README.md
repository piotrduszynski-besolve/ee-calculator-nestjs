
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
# Analyzes

## Note about last approach
I did a first try to the exercise here: https://github.com/piotrduszynski-besolve/ee-calculator

I decided to try again with a different approach, as I spend to much time on setup the project stack. Now I'm building projects based on nestjs, which speeds up the development phase significantly, thanks to build-in generators for setup project and generate project files.
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
    
    I've spent some time before starting the coding on analyzes, in the meantime before starting coding exercise. It was hard to find 2h of efficient time to do it. So I had a lot of thoughts before starting. 
    Then did the coding. I decided to split time into 15 minutes sessions maximum. To keep on track of what progress I made and do I need to change a plan o execution.
- Required: Test Coverage, Simplicity, Self-explanatory code
- Include Readme 
- Include the Version number

### How to deliver business value quickly
- Backend endpoint-based calc as the first stage
- 3rd party calc - https://mathjs.org/ https://nerdamer.com/ , https://www.npmjs.com/package/static-eval
- eval could be used to calc equation from a string, but executing JavaScript from a string can lead to an enormous security risk.
- ASCI Art -> Equal Expert Branding
- Server rendered calc webpage
- nestjs as framework- easy and quick to use, embedded server rendering, build in generator for project and files

### Risks
- Small amount of time -> 15 minutes coding sessions
- That can lead to problem with implementing 2 tasks that are in my opinion must have:
  
  - deployment
  - product analytics/metrics

### Story Mapping - plan of work
|**ID**|**Input Equation**            | **Calculate**         | **Display Result**         | **Memorize Equation** | **Clear** |
|------|------------------------------|-----------------------|----------------------------|-----------------------|-----------|
|1     |Endpoint to send equation     | Basic operations(+,-) | Add branding - JSON        |                       |           |
|2     |Validate input string + trim  |                       | Add branding - ASCI art    |                       |           |
|3     |                              | Basic operations(*,/) |                            |                       |           |
|3.1   |                              |   Order of operations |                            |                       |           |
|3.2   |                              |   Divide by 0         |                            |                       |           |
|4     |                              |                       | HTML page + branding image |                       |           |
|5     |Home page with equation input |                       |                            |                       |           |

### Technology stack
#### CI
- husky + nestjs
- Create app artifacts using Github Releases
- If MVP is created, think about adding Github action for CI
- If MVP is created, think about the creation of an artifact as a Docker image in GitHub Container Registry
#### CD
Simple and quick to deploy:
- Manual releases to AWS Lightsail
- If MVP is created, add deployment via AWS Pipeline
- If MVP is created, add IaC
### Product Monitoring
 - If MVP is created, add Mixpanel
 
## Session Notes
## 1 Add Nestjs + Husky(4 minutes)
- The same functionalities as with manual initialization from last approach + TS + Prittier and more

