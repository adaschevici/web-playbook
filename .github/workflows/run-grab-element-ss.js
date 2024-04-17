name: Run Grab Element Screenshots

on: [workflow_dispatch] # Define when to run the workflow

jobs:
  element-grab-node:
    runs-on: ubuntu-latest # Specify the runner

    steps:
    - name: Checkout code
      uses: actions/checkout@v2 # Checks-out your repository under $GITHUB_WORKSPACE

    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '21' # Specify the Node.js version

    - name: Install pnpm
      run: npm install -g pnpm # Install pnpm package manager

    - name: Install dependencies
      working-directory: puppeteer-snips
      run: pnpm install # Install the dependencies

    - name: Run Puppet tests
      working-directory: puppeteer-snips
      run: node  grab-element-ss.js # Run one puppteeer script

    - name: Upload Screenshots as Artifacts
      if: always() # Always run this step
      uses: actions/upload-artifact@v2
      with:
        name: screenshots
        path: puppeteer-snips/screenshots/

