Changelog — changes made on 2026-03-29

Summary
-------
This file documents small repository housekeeping and fixes made locally on 2026-03-29.

Edits performed
---------------
1. package.json
   - Merged duplicate/fragmented `scripts` sections and added missing scripts:
     - `dev` (cross-env compatible), `build`, `start`, `check`, `db:push`
   - Reason: ensure single source of scripts and make `db:push` available on Windows environments.

2. .gitignore
   - Added entries to ignore local environment files and Google client secret:
     - `.env`, `.env.*`, `.env.local`
     - `client_secret_533075987884-al64mq9ilm0sag9d5711pm6b02vk1mi8.apps.googleusercontent.com.json`
   - Ensured `.env.example` is explicitly allowed so a template remains in the repo.
   - Reason: avoid committing secrets and keep a usable template for contributors.

3. Added `.env.example`
   - A template developers can copy to `.env` and fill with real credentials locally.
   - Reason: document required environment variables while keeping secrets out of the repo.

4. Git operations
   - Created and pushed a backup branch on the original repo: `backup/rollback-2026-03-29`.
   - Force-reset `origin/main` to the previous commit (rollback changes pushed during this session).
   - Reason: user requested the original repository to be restored to its prior state while preserving a backup of the pushed changes.

5. Misc
   - Committed `.gitignore` and `.env.example` changes and pushed them to the original repo before rolling back main.

Notes / Next steps
------------------
- Local copy: Your local working copy still contains the changes we made. If you want these changes available on GitHub under a new repository, push this branch to a new remote (instructions below).
- Database migrations: `npm run db:push` requires a `DATABASE_URL` in the environment. Use a local or hosted Postgres and set `$env:DATABASE_URL` before running.
- Secrets: If any secret values were ever committed to the remote earlier, rotate them immediately.

End of changelog.
