# Test Cases Summary — Calendar Widget Generator
## 1. Scope

# Test Cases Summary — Calendar Widget Generator
## 1. Scope

The page for generating iframe code for the events calendar is being tested:

***Coverage:***

- Functional logic of iframe generation

- Size validation

- Controls synchronization

- Passing parameters to src

- Code copy

***Not covered:***

- Inner iframe content (external service)

- Cross-browser compatibility

- Visual pixel-perfect verification

## 2. Prioritization

***P1*** — critical for the main generation function

***P2*** — important, affects UX and state correctness

***P3*** — boundary and additional checks

## 3. Automation rationale

***Automated scenarios***:

- Repeatable

- Critical for business logic

- Have a clear expected result

- Prone to regressions (validation, synchronization)

***Not automated***:

- Checks for container height setting (duplicate width logic, not critical for test task)

- Page language switch (RU / EN)

- Visual aesthetics

- Instruction texts

- Code insertion recommendations checks

## 4. Out of Scope

In this test project, not automated:

- Page language switch (Russian / English)

- Cross-browser testing

- Pixel-perfect visual comparison

- Accessibility testing

- Performance testing

- Load testing

- SEO and meta tags checks

- Recommendations for embedding iframe in HTML document

**Reasons**:

- iframe loads external resource

- project focus is generation logic

- limited scope of the test task

***Coverage:***

- Functional logic of iframe generation

- Size validation

- Controls synchronization

- Passing parameters to src

- Code copy

***Not covered:***

- Inner iframe content (external service)

- Cross-browser compatibility

- Visual pixel-perfect verification

## 2. Prioritization

***P1*** — critical for the main generation function

***P2*** — important, affects UX and state correctness

***P3*** — boundary and additional checks

## 3. Automation rationale

***Automated scenarios***:

- Repeatable

- Critical for business logic

- Have a clear expected result

- Prone to regressions (validation, synchronization)

***Not automated***:

- Checks for container height setting (duplicate width logic, not critical for test task)

- Page language switch (RU / EN)

- Visual aesthetics

- Instruction texts

- Code insertion recommendations checks

## 4. Out of Scope

In this test project, not automated:

- Page language switch (Russian / English)

- Cross-browser testing

- Pixel-perfect visual comparison

- Accessibility testing

- Performance testing

- Load testing

- SEO and meta tags checks

- Recommendations for embedding iframe in HTML document

**Reasons**:

- iframe loads external resource

- project focus is generation logic

- limited scope of the test task