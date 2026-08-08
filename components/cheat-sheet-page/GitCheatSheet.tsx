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
              {`git init
git clone <repo-url>
git clone <repo-url> <directory>`}
            </pre>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Status and history</h3>
            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
              {`git status
git status --short --branch

git log
git log --oneline --graph --decorate --all
git log --stat`}
            </pre>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Add and commit</h3>
            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
              {`git add <file>
git add .
git add -p   # interactive patch staging

git commit -m "message"
git commit --amend --no-edit`}
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
              {`git diff                 # unstaged changes
git diff --staged        # staged changes

git diff <commit> <file>
git diff HEAD~1..HEAD`}
            </pre>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Restore files</h3>
            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
              {`git restore <file>           # reset working tree from index or HEAD
git restore --staged <file>  # unstage file

git checkout -- <file>       # older command, same as restore`}
            </pre>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Remove files</h3>
            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
              {`git rm <file>               # remove file from working tree and index
git rm --cached <file>      # keep file locally, remove from index`}
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
                {`git branch                  # list branches
git branch <name>           # create branch
git branch -d <name>        # delete branch (if merged)
git branch -D <name>        # force delete branch`}
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Switch branches</h3>
              <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                {`git switch <branch>
git switch -c <branch>      # create and switch
git checkout <branch>       # older command
git switch -C <branch>      # recreate branch from current commit`}
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
                {`git branch -u origin/<branch>    # set upstream
git push -u origin <branch>      # create branch on remote and track
git branch -vv                   # show upstream tracking info`}
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Rename branch</h3>
              <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                {`git branch -m <old> <new>

git push origin --delete <old>
git push origin -u <new>`}
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
              {`git checkout main
git merge feature-branch
git merge --no-ff feature-branch
git merge --abort`}
            </pre>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Rebase</h3>
            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
              {`git checkout feature-branch
git rebase main

# Interactive rebase
git rebase -i HEAD~<n>

git rebase --continue
git rebase --skip
git rebase --abort`}
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
                {`git remote -v
git remote add origin <repo-url>
git remote remove origin
git remote show origin`}
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Fetch, pull, push</h3>
              <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                {`git fetch origin
git pull origin <branch>

git pull --rebase origin <branch>
git push origin <branch>
git push origin --delete <branch>`}
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
                {`git push -u origin <branch>   # push and track upstream
git pull --rebase               # keep history linear
git push --force-with-lease    # safer force push`}
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Clean up stale remotes</h3>
              <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                {`git remote prune origin
git fetch --prune
git branch -r              # list remote branches`}
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
              {`git stash save "message"
git stash push -m "message"
git stash list
git stash show -p stash@{0}
git stash apply stash@{0}
git stash pop
git stash drop stash@{0}
git stash clear`}
            </pre>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Branch from stash</h3>
            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
              {`git stash branch <name> stash@{0}`}
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
                {`git commit --amend
git revert <commit>
git cherry-pick <commit>`}
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Reset modes</h3>
              <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                {`git reset --soft HEAD~1      # keep changes staged
git reset --mixed HEAD~1     # keep changes unstaged
git reset --hard HEAD~1      # discard changes`}
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Recover lost commits</h3>
              <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                {`git reflog
git checkout <sha>
git switch -c recovery <sha>`}
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
                {`git bisect start
git bisect bad
git bisect good <known-good-commit>
# test, then mark each step
git bisect good
# or
git bisect bad
git bisect reset`}
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
              {`git tag <name>                 # lightweight tag
git tag -a <name> -m "message"   # annotated tag
git tag -s <name> -m "message"   # signed tag`}
            </pre>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Push tags</h3>
            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
              {`git push origin <tag>
git push --tags
git push --follow-tags`}
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
                {`git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global core.editor "code --wait"`}
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Useful config</h3>
              <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                {`git config --global core.autocrlf input
git config --global pull.rebase true
git config --global push.default current
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.lg "log --oneline --graph --decorate --all"`}
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
              {`git show <commit>
git show <branch>..<branch>
git blame <file>

git diff --name-only HEAD~1`}
            </pre>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Save work in progress</h3>
            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
              {`git stash push -k -m "wip"   # stash but keep staged changes
git stash push --include-untracked`}
            </pre>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Cleanup</h3>
            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
              {`git gc --aggressive --prune=now
git stash clear`}
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
