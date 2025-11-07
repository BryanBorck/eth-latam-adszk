# Claude Rules for ETH LATAM ADSZK

## Project Philosophy

This is a **Turborepo monorepo** using **Bun** as the package manager. Maintain clean separation between apps and packages while maximizing code reuse through shared packages.

## Code Style & Conventions

### TypeScript
- Use **strict mode** - all TypeScript configs have `strict: true`
- Prefer **explicit types** over `any`
- Use **functional components** with hooks in React
- Use **named exports** unless there's a clear reason for default exports

### Formatting
- **Prettier** is the source of truth for formatting
- Settings: single quotes, no semicolons, 2 spaces, 100 char line width
- Format before committing: `bun format`

### File Naming
- **React components**: PascalCase (e.g., `UserProfile.tsx`)
- **Utilities/hooks**: camelCase (e.g., `useAuth.ts`, `formatDate.ts`)
- **Config files**: kebab-case (e.g., `next.config.ts`)

## Monorepo Structure

### Apps vs Packages
- **apps/**: End-user applications (Next.js, etc.)
  - Each app is independently deployable
  - Apps can depend on packages but not other apps

- **packages/**: Shared code libraries
  - **contracts/**: Smart contract ABIs, addresses, and blockchain utilities
  - **sdk/**: TypeScript SDK for interacting with the protocol
  - Future packages: ui components, shared utilities, etc.

### Configuration Hierarchy
- **Root-level configs**: `.nvmrc`, `.npmrc`, `.prettierrc`, `turbo.json`
  - These apply to the ENTIRE monorepo
  - Don't duplicate in apps/packages unless overriding is necessary

- **App-level configs**: `package.json`, `tsconfig.json`, `.eslintrc.json`
  - Each app needs its own
  - Extend root configs where possible

### Workspace Dependencies
When one package needs another, use workspace protocol:
```json
{
  "dependencies": {
    "@eth-latam-adszk/contracts": "workspace:*",
    "@eth-latam-adszk/sdk": "workspace:*"
  }
}
```

## Technology Stack

### Client Apps (apps/client-example)
- **Next.js 15** with App Router
- **React 19** with TypeScript
- **Tailwind CSS v4** (beta) - using `@import 'tailwindcss'` syntax
- **shadcn/ui** - Add components via `bunx shadcn@latest add <component>`
- **Bun** - Package manager and runtime

### Smart Contracts (packages/contracts)
- Store ABIs, contract addresses, and types
- Export contract utilities for use in apps and SDK
- Keep blockchain-specific code isolated here

### SDK (packages/sdk)
- Pure TypeScript library
- Should work in both Node.js and browser
- Export clean, typed APIs
- No framework dependencies

## Development Workflow

### Adding New Features
1. Determine if it belongs in an **app** or a **package**
2. If shared functionality → create/update a package
3. If app-specific → keep it in the app
4. Use Turborepo's build caching - configure in `turbo.json`

### Adding Dependencies
- **Root dependencies**: Only dev tools used across all workspaces (prettier, turbo, etc.)
- **App dependencies**: Install in the specific app directory
- **Package dependencies**: Keep minimal, think about bundle size

```bash
# Install in specific workspace
cd apps/client-example
bun add <package>

# Or from root
bun add <package> --filter=client-example
```

### Adding shadcn/ui Components
Always run from the app directory:
```bash
cd apps/client-example
bunx shadcn@latest add <component>
```

Components will be added to `src/components/ui/` with proper configuration.

## Tailwind CSS v4 Guidelines

### Import Syntax
Use the new v4 import in `globals.css`:
```css
@import 'tailwindcss';
```

### Theme Configuration
- CSS variables are defined in `globals.css` using `@layer base`
- Support both light and dark modes with `:root` and `.dark`
- Use semantic color naming (background, foreground, primary, etc.)

### Custom Styles
Prefer Tailwind utility classes over custom CSS when possible.

## Git Workflow

### Commit Messages
- Use conventional commits: `feat:`, `fix:`, `docs:`, `chore:`, etc.
- Be descriptive but concise
- Example: `feat(client): add user authentication flow`

### Branch Naming
- Feature: `feature/description`
- Fix: `fix/description`
- Chore: `chore/description`

## Testing Strategy

### Unit Tests
- Packages should have unit tests
- Use Vitest or Jest (to be configured)
- Test utilities and business logic

### Integration Tests
- Apps should have integration tests
- Test user flows and API integrations

### E2E Tests
- Critical user paths in client apps
- Use Playwright or Cypress (to be configured)

## Performance Considerations

### Turborepo Caching
- Properly configure `outputs` in `turbo.json`
- Utilize task dependencies with `dependsOn`
- Cache builds but not dev tasks

### Bundle Size
- Keep package dependencies minimal
- Use dynamic imports for large dependencies
- Monitor build output sizes

### Code Splitting
- Use Next.js automatic code splitting
- Lazy load components when appropriate
- Keep initial bundle small

## Security Best Practices

### Environment Variables
- **Never commit** `.env` files
- Use `.env.example` for documentation
- Prefix public vars with `NEXT_PUBLIC_` in Next.js

### Smart Contract Interactions
- Always validate contract addresses
- Use TypeScript types for contract ABIs
- Implement proper error handling

### API Keys & Secrets
- Store in environment variables
- Use different keys for dev/prod
- Rotate keys regularly

## Documentation

### Code Comments
- Document **why**, not **what**
- Add JSDoc for public APIs
- Keep comments up-to-date

### README Files
- Each package should have a README
- Document API, usage examples, and setup
- Keep the root README as a project overview

## Folder Structure Standards

### Apps Structure
```
apps/client-example/
├── src/
│   ├── app/              # Next.js app router
│   ├── components/       # React components
│   │   └── ui/          # shadcn/ui components
│   ├── lib/             # Utilities
│   └── hooks/           # Custom hooks
├── public/              # Static assets
└── package.json
```

### Package Structure
```
packages/[package-name]/
├── src/
│   └── index.ts        # Main entry point
├── package.json
└── tsconfig.json
```

## When in Doubt

1. **Consistency over cleverness** - follow existing patterns
2. **Shared before duplicated** - if code is used twice, consider making it a package
3. **Type safety first** - use TypeScript features fully
4. **Performance matters** - but readability matters more
5. **Document decisions** - leave comments explaining non-obvious choices

## Common Commands Reference

```bash
# Install all dependencies
bun install

# Run all apps in dev mode
bun dev

# Build everything
bun build

# Lint all code
bun lint

# Format all code
bun format

# Run specific app
cd apps/client-example && bun dev

# Add dependency to specific workspace
bun add <package> --filter=client-example

# Add shadcn component
cd apps/client-example && bunx shadcn@latest add <component>
```

---

**Last Updated**: 2025-11-06
**Maintainer**: Keep this file updated as conventions evolve