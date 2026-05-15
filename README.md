# React CI App – Module 5 Assignment

A React application with automated CI pipeline using **GitHub Actions** and a **self-hosted runner**.

---

## Project Structure

```
react-ci-app/
├── .github/
│   └── workflows/
│       └── ci.yml          ← GitHub Actions workflow
├── public/
│   └── index.html
├── src/
│   ├── App.js              ← React component + utility functions
│   ├── App.test.js         ← 30 test cases (unit + integration)
│   ├── App.css
│   └── index.js
└── package.json
```

---

## What Tests Cover

### Unit Tests (pure functions)
| Function | What is tested |
|---|---|
| `add(a, b)` | positive, negative, decimal, zero |
| `multiply(a, b)` | positive, negative, zero, decimal |
| `isEven(n)` | even and odd numbers |
| `reverseString(str)` | normal, empty, single char, spaces |
| `factorial(n)` | base cases, large values, negative error |
| `isPalindrome(str)` | true/false, mixed case, punctuation |

### Integration Tests (React component)
| Scenario | What is tested |
|---|---|
| Rendering | Heading, subheading, inputs, buttons present |
| Add interaction | Correct result displayed; invalid input handled |
| Multiply interaction | Correct result displayed; invalid input handled |

**Total: 30 test cases**

---

## How to Run Locally

```bash
npm install
npm test           # runs all tests
npm run build      # creates production build in /build
```

---

## How the CI Pipeline Works

### Trigger
The pipeline fires automatically on:
- Every `git push` to the `development` branch
- Every Pull Request targeting `development`

### Jobs

```
Push to development
       │
       ▼
  ┌─────────┐
  │  test   │  ← Runs on self-hosted runner
  │         │    1. Checkout code
  │         │    2. Setup Node.js 18
  │         │    3. npm ci
  │         │    4. npm test (30 tests)
  │         │    5. Upload coverage report
  └────┬────┘
       │ (only if tests PASS)
       ▼
  ┌─────────┐
  │  build  │  ← Runs on self-hosted runner
  │         │    1. Checkout code
  │         │    2. Setup Node.js 18
  │         │    3. npm ci
  │         │    4. npm run build
  │         │    5. Upload build artifact
  └─────────┘
```

---

## Setting Up the Self-Hosted Runner

1. Go to your GitHub repo → **Settings → Actions → Runners**
2. Click **"New self-hosted runner"**
3. Choose your OS (Linux/Windows/Mac)
4. Follow the commands to download and configure the runner agent on your machine
5. Start the runner:
   ```bash
   ./run.sh        # Linux/Mac
   run.cmd         # Windows
   ```
6. In the workflow, `runs-on: self-hosted` tells GitHub Actions to use your machine

---

## Concepts Explained

### CI/CD
**Continuous Integration (CI)** means every code change is automatically tested and built as soon as it is pushed. This ensures bugs are caught early, before they reach production.

**Continuous Deployment (CD)** extends this by automatically deploying the application after a successful build — so releases are fast, consistent, and human-error-free.

### Self-Hosted Runner
A **self-hosted runner** is your own machine (laptop, server, or VM) that executes GitHub Actions jobs instead of GitHub's cloud machines. You install a small agent from GitHub, connect it to your repo, and it listens for workflow jobs.

**Why use self-hosted?**
- Free (no usage minutes consumed)
- Access to local network/resources
- Custom software or hardware requirements
- Faster builds (if your machine is powerful)

### Workflow Execution Process
1. Developer pushes code to the `development` branch
2. GitHub detects the push and reads `.github/workflows/ci.yml`
3. GitHub sends the job to your **self-hosted runner**
4. The runner executes each **step** in order (checkout → install → test → build)
5. Results (pass/fail, logs, artifacts) are shown in the **Actions tab** on GitHub
6. If any step fails, subsequent steps are skipped and the pipeline is marked ❌ failed
7. Developers can read the logs to debug exactly which step failed and why

---

## Debugging Pipeline Failures

Common failure scenarios and how to read them:

| Failure | Log message | Fix |
|---|---|---|
| Test fails | `FAIL src/App.test.js` | Fix the failing test or the code |
| Dependency missing | `Cannot find module` | Run `npm install` and commit `package-lock.json` |
| Build warning treated as error | `Treating warnings as errors` | Set `CI: false` in the build step env |
| Runner offline | `Waiting for a runner...` | Start the self-hosted runner agent |
| Node version mismatch | `engine node version mismatch` | Match `node-version` in YAML to your app's requirement |
