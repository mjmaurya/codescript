export function GitCheatSheet() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Git basics</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400">Start repositories, inspect history, and publish your work.</p>
        <div className="mt-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Initialize and clone</h3>
            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
              {`git init                        # Initialize a new local Git repository
git clone <repo-url>             # Download repository from remote URL
git clone <repo-url> <directory> # Clone repository into a specific directory`}
            </pre>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Status and history</h3>
            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
              {`git status                      # Show repository working directory and staging status
git status --short --branch     # Show compact status with current branch info

git log                         # View commit history
git log --oneline --graph --decorate --all # View graphical history across all branches on single lines
git log --stat                  # View history with file change statistics`}
            </pre>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Add and commit</h3>
            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
              {`git add <file>                  # Stage specific file for commit
git add .                       # Stage all modified and new files
git add -p                      # Interactively select chunks of changes to stage

git commit -m "message"         # Commit staged changes with a descriptive message
git commit --amend --no-edit    # Add staged changes to latest commit without changing message`}
            </pre>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Working tree and staging</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400">Commands to inspect and restore file state safely.</p>
        <div className="mt-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">View changes</h3>
            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
              {`git diff                        # Show unstaged modifications in working directory
git diff --staged               # Show modifications in staging area ready to commit

git diff <commit> <file>        # Show differences in a file relative to a specific commit
git diff HEAD~1..HEAD           # Show differences between previous and latest commit`}
            </pre>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Restore files</h3>
            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
              {`git restore <file>              # Discard local uncommitted changes in working directory
git restore --staged <file>     # Unstage file changes while keeping local modifications

git checkout -- <file>          # Older command to discard local modifications`}
            </pre>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Remove files</h3>
            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
              {`git rm <file>                  # Remove file from working directory and staging area
git rm --cached <file>         # Remove file from tracking while keeping local file on disk`}
            </pre>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Branching</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">Create, switch, and maintain branches.</p>
          <div className="mt-6 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Branch commands</h3>
              <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                {`git branch                     # List local branches
git branch <name>              # Create new branch
git branch -d <name>           # Delete branch if fully merged
git branch -D <name>           # Force delete branch regardless of merge status`}
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Switch branches</h3>
              <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                {`git switch <branch>           # Switch to target branch
git switch -c <branch>         # Create and switch to new branch
git checkout <branch>          # Older command to switch branches
git switch -C <branch>         # Force create or reset and switch to target branch`}
              </pre>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Branch tracking</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">Connect local branches to remotes and rename branches.</p>
          <div className="mt-6 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Tracking branches</h3>
              <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                {`git branch -u origin/<branch>  # Link current local branch to remote upstream branch
git push -u origin <branch>     # Push local branch to remote and configure tracking
git branch -vv                  # List local branches with upstream information and commit details`}
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Rename branch</h3>
              <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                {`git branch -m <old> <new>       # Rename local branch

git push origin --delete <old>  # Remove old branch from remote
git push origin -u <new>        # Push new branch name and set upstream`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Merge and rebase</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400">Integrate changes from one branch to another cleanly.</p>
        <div className="mt-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Merge</h3>
            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
              {`git checkout main               # Switch to target branch for merge
git merge feature-branch        # Merge feature branch into current branch
git merge --no-ff feature-branch# Merge and force creation of a merge commit
git merge --abort               # Abort active merge process and restore state`}
            </pre>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Rebase</h3>
            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
              {`git checkout feature-branch     # Switch to branch to rebase
git rebase main                 # Reapply commits from current branch on top of main

# Interactive rebase
git rebase -i HEAD~<n>          # Reorder, squash, or edit last n commits interactively

git rebase --continue          # Resume rebase process after resolving conflicts
git rebase --skip              # Skip current conflicting patch during rebase
git rebase --abort             # Abort rebase operation and restore original state`}
            </pre>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Remote repositories</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">Fetch, share, and keep your local repository in sync.</p>
          <div className="mt-6 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Remote setup</h3>
              <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                {`git remote -v                  # List configured remote repositories with URLs
git remote add origin <url>    # Attach local repo to a remote repository URL
git remote remove origin       # Disconnect remote repository handle
git remote show origin         # Inspect detailed status of remote repository`}
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Fetch, pull, push</h3>
              <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                {`git fetch origin               # Download history and references from remote without merging
git pull origin <branch>        # Fetch and merge remote changes into active branch

git pull --rebase origin <branch> # Fetch and reapply local commits on top of incoming remote branch
git push origin <branch>        # Upload local branch commits to remote repository
git push origin --delete <branch> # Remove specified branch from remote repository`}
              </pre>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Remote branch workflows</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">Common commands for branch sharing and cleanup.</p>
          <div className="mt-6 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Publish and track</h3>
              <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                {`git push -u origin <branch>   # Push new branch to remote and set default tracking
git pull --rebase               # Rebase current branch on tracked upstream changes
git push --force-with-lease    # Safely overwrite remote branch history if unchanged by others`}
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Clean up stale remotes</h3>
              <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                {`git remote prune origin        # Remove local tracking references to deleted remote branches
git fetch --prune               # Fetch updates and purge deleted remote branch references
git branch -r                  # List all branches on remote repositories`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Stash</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400">Temporarily store work in progress and reapply it later.</p>
        <div className="mt-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Save and restore</h3>
            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
              {`git stash save "message"       # Save uncommitted changes with description (deprecated style)
git stash push -m "message"    # Save uncommitted work-in-progress changes with a label
git stash list                 # Display all saved stashes
git stash show -p stash@{0}    # Inspect diff contents of a specific stash
git stash apply stash@{0}   # Reapply stash changes while retaining stash entry
git stash pop                  # Apply most recent stash and remove it from stack
git stash drop stash@{0}    # Delete specified stash from stack
git stash clear                # Remove all saved stashes from stack`}
            </pre>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Branch from stash</h3>
            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
              {`git stash branch <name> stash@{0} # Create new branch and apply specified stash to it`}
            </pre>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Undo and recover</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">Fix mistakes without losing work.</p>
          <div className="mt-6 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Commit history</h3>
              <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                {`git commit --amend             # Modify latest commit message or add newly staged changes
git revert <commit>             # Create new commit that undoes changes from a target commit
git cherry-pick <commit>        # Apply changes introduced by an existing commit to current branch`}
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Reset modes</h3>
              <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                {`git reset --soft HEAD~1        # Undo commit, leave changes staged in index
git reset --mixed HEAD~1       # Undo commit, leave changes in working directory (unstaged)
git reset --hard HEAD~1        # Undo commit and permanently delete all local modifications`}
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Recover lost commits</h3>
              <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                {`git reflog                    # View chronological log of reference HEAD position changes
git checkout <sha>             # Switch working directory state to isolated commit SHA
git switch -c recovery <sha>   # Create new branch starting from recovered commit SHA`}
              </pre>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Bisect</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">Binary search to locate the commit introducing a bug.</p>
          <div className="mt-6 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Bisect flow</h3>
              <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                {`git bisect start              # Begin binary search session for bug hunting
git bisect bad                 # Mark current commit as containing the bug
git bisect good <commit>       # Mark target historical commit as bug-free
# test, then mark each step
git bisect good                # Mark current step commit as bug-free
# or
git bisect bad                 # Mark current step commit as containing bug
git bisect reset               # End bisect session and return to original HEAD`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Tags</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400">Annotate releases and snapshots in history.</p>
        <div className="mt-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Create tags</h3>
            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
              {`git tag <name>                 # Create lightweight pointer tag at HEAD
git tag -a <name> -m "message"   # Create annotated tag storing metadata and message
git tag -s <name> -m "message"   # Create GPG-signed annotated tag`}
            </pre>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Push tags</h3>
            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
              {`git push origin <tag>          # Send specified tag to remote repository
git push --tags                # Send all local tags to remote repository
git push --follow-tags         # Send annotated tags associated with pushed commits`}
            </pre>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Configuration</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">Set user identity, defaults, and aliases.</p>
          <div className="mt-6 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">User settings</h3>
              <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                {`git config --global user.name "Your Name"  # Set author name for global commits
git config --global user.email "you@example.com" # Set author email for global commits
git config --global core.editor "code --wait"    # Set VS Code as default Git commit editor`}
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Useful config</h3>
              <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                {`git config --global core.autocrlf input # Normalize line endings to LF on commit
git config --global pull.rebase true      # Make rebase default behavior for git pull
git config --global push.default current  # Restrict git push default to active branch
git config --global alias.co checkout     # Set 'co' shortcut for checkout
git config --global alias.br branch       # Set 'br' shortcut for branch
git config --global alias.ci commit       # Set 'ci' shortcut for commit
git config --global alias.st status       # Set 'st' shortcut for status
git config --global alias.lg "log --oneline --graph --decorate --all" # Set custom formatted log alias`}
              </pre>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Workflow patterns</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">Common branching models and daily work routines.</p>
          <div className="mt-6 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Feature branch workflow</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-400">Create a branch for each feature, rebase or merge into main, then delete the branch.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Trunk-based workflow</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-400">Commit small, frequent changes to main and use short-lived branches for fixes or experiments.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Git flow essentials</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-400">Use enduring <code className="rounded bg-slate-100 px-1 text-slate-900 dark:bg-slate-800 dark:text-slate-100">main</code> and <code className="rounded bg-slate-100 px-1 text-slate-900 dark:bg-slate-800 dark:text-slate-100">develop</code> branches plus release, hotfix, and feature branches. Keep merges intentional.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Advanced references</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400">Commands for history inspection, patch workflows, and efficiency.</p>
        <div className="mt-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Inspect history</h3>
            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
              {`git show <commit>               # Display commit details and file content changes
git show <branch>..<branch>     # View differences between two branch endpoints
git blame <file>                 # Display file line-by-line with author and commit metadata

git diff --name-only HEAD~1     # List names of files changed in previous commit`}
            </pre>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Save work in progress</h3>
            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
              {`git stash push -k -m "wip"     # Stash unstaged modifications while preserving staged items
git stash push --include-untracked # Stash uncommitted changes including newly untracked files`}
            </pre>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Cleanup</h3>
            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
              {`git gc --aggressive --prune=now # Optimize repository storage and delete unreachable objects
git stash clear                # Purge all entries from local stash store`}
            </pre>
          </div>
        </div>
      </section>

      <footer className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
        <p className="text-sm">
          Use this reference to move from quick edits to strong Git confidence. When in doubt, inspect <code className="rounded bg-slate-100 px-1 text-slate-900 dark:bg-slate-800 dark:text-slate-100">git status</code>, verify with <code className="rounded bg-slate-100 px-1 text-slate-900 dark:bg-slate-800 dark:text-slate-100">git log</code>, and keep your changes backed up to a remote.
        </p>
      </footer>
    </div>
  );
}