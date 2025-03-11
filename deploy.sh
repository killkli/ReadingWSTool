#!/bin/bash

# Script to build a Vite project and automatically deploy to a remote Git Pages branch.
#  Assumes you have Git configured and authenticated for your remote repository.

# --- Configuration ---
BUILD_DIR="dist"       # Directory where Vite builds the project.  Change if needed.
GIT_REMOTE="origin"     # Your Git remote name (usually "origin").
GIT_BRANCH="gh-pages"   # The Git branch for your Git Pages site (usually "gh-pages").
COMMIT_MESSAGE="Deploy to GitHub Pages" # Commit message for the deployment.
# --- End Configuration ---

# --- Functions ---

function build_project() {
  echo "Building the Vite project..."
  npm run build  # Or yarn build, pnpm build, etc.  Adjust as needed.

  if [ $? -ne 0 ]; then
    echo "Build failed.  Exiting."
    exit 1
  fi

  echo "Build complete."
}

function deploy_to_git_pages() {
  echo "Deploying to Git Pages branch '$GIT_BRANCH'..."

  # Navigate to the build directory
  cd "$BUILD_DIR" || { echo "Error: Could not navigate to build directory '$BUILD_DIR'."; exit 1; }

  # Initialize a Git repository if it doesn't exist
  if [ ! -d ".git" ]; then
    echo "Initializing Git repository..."
    git init

    # Get the remote URL from the main project's .git/config
    REMOTE_URL=$(git -C .. config --get remote."$GIT_REMOTE".url)

    if [ -z "$REMOTE_URL" ]; then
      echo "Error: Could not determine remote URL.  Make sure the remote '$GIT_REMOTE' is configured in the parent directory."
      exit 1
    fi

    # Add the remote to the build directory's Git repository
    git remote add origin "$REMOTE_URL"

  fi

  # Add all files to the staging area
  git add .

  # Commit the changes
  git commit -m "$COMMIT_MESSAGE"

  # Push to the remote branch, force replacing the existing branch
  git push -f "$GIT_REMOTE" "HEAD:$GIT_BRANCH"

  if [ $? -ne 0 ]; then
    echo "Deployment failed.  Check your Git configuration and permissions."
    exit 1
  fi

  echo "Deployment successful!  Your site should be live shortly."

  # Return to the original directory
  cd ..
}

# --- Main Script ---

# Check if required tools are installed
if ! command -v git &> /dev/null
then
    echo "Error: git is not installed. Please install git."
    exit 1
fi

if ! command -v npm &> /dev/null
then
    echo "Error: npm is not installed. Please install npm (or yarn/pnpm)."
    exit 1
fi

build_project
deploy_to_git_pages

echo "Script completed."

exit 0
