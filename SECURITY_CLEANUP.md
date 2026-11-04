# Auth repository security cleanup

## Confirmed malware removed

- `client/my-app/vite.config.js` contained an obfuscated JavaScript loader.
- `.vscode/tasks.json` contained a hidden folder-open task that attempted to execute Node.js against a disguised font.
- `client/my-app/src/features/auth/public/fonts/fa-solid-900.woff2` matched a confirmed malicious JavaScript payload, not a font.
- `.vscode/settings.json` enabled automatic tasks.

The malware cleanup restores a valid Vite configuration, removes the task and malicious file,
disables automatic VS Code tasks, and adds a dependency-free GitHub Actions guard.

## Separate, serious authentication vulnerability

The backend currently stores passwords as plaintext and compares the stored password
directly during login. This is **not** part of the identified loader infection.
Do not use this authentication implementation for real users until passwords are
hashed using a password-specific algorithm such as Argon2id or bcrypt.
Existing accounts require a carefully planned password-reset or migration process;
simply changing the login comparison can lock users out.

## Remaining incident response

1. Check developer workstations and servers that executed the infected project.
2. Rotate potentially exposed tokens and database credentials from a trusted device.
3. Review historical commits and cloned/deployed copies; current-branch cleanup does not erase prior Git history.
4. Review the GitHub Actions security check and separately validate app functionality.
5. Keep local environment files out of Git, and store deployment secrets in a secrets manager.

This scanner checks campaign-specific indicators and is not a comprehensive malware assessment.
