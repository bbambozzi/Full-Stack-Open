## CI/CD in a Nutshell

The main steps of a good CI/CD pipeline are condensed into four main steps.

##### 1. Source
The code is pulled from a developer's machine into the version control system of the project, usually git.
This can be done in GitHub, Gitlab, and BitBucket. This stage includes code quality analysis, where the team is expected to ensure the quality of the code being pulled into the repository. Interaction between developers and feedback continuously expands the codebase and maintains style guidelines.
##### 2. Build
While some languages such as Python, Lisp and Ruby don't necessarily require a build step, in some languages like C++ a build step is required. In the case of TypeScript, transpilation to JavaScript is necessary in order for the browser to understand the code. Tools like AWS CodeCommit and Jenkins are usually used for this step.

##### 3. Test
Making sure the application acts predictably and does everything we expect it to do gives us the benefit of being able to deploy in a quick-paced manner. Unit tests, mocks and integration tests might be used to ensure our application does exactly what we want it to do, and produces expected results. Common tools include Jest and Cypress.

##### 4. Deployment
We then proceed to stage the application for development. In large applications, QA testing provides a reliable way to test applications manually one last time before they're ready to be used by the end user. In smaller scale teams, this might be done by a developer himself, or might even be omitted in favor of relying on automated tests exclusively. The final step is the effective deployment, where the application is in production and the end users can use the new version and be dazzled by the application!
