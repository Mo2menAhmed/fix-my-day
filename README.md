# Fix My Day

A calming React Native Expo app for recovering from a stressful, unproductive, or messy day.

## What is included

- TypeScript Expo app
- Home screen with recovery categories
- Time selection screen
- Recovery plan screen
- Focus timer screen
- Reflection screen
- Settings screen
- First-run onboarding screen
- Premium placeholder screen for future payment work
- Local JSON recovery templates
- AsyncStorage persistence for completed plans, favorite plans, checklist progress, and user preferences
- Placeholder app icon, adaptive Android icon, and splash image

## Run locally

Install Node.js first, then run:

```bash
npm ci
npm start
```

For Expo SDK package alignment after install, you can also run:

```bash
npx expo install --fix
```

The app currently uses local templates from `src/data/recoveryPlans.json` and does not require a backend.

Useful local checks:

```bash
npm run typecheck
npx expo config --type public
```

## Run with Docker

```bash
docker compose up --build
```

Open the web app at:

```text
http://localhost:8082
```

This project maps Expo's container port `8081` to host port `8082` so it can run beside other Expo projects.

Docker sets `EAS_NO_VCS=1` because this workspace is not currently a Git repository.

Docker checks:

```bash
docker exec fix-my-day npm run typecheck
docker exec fix-my-day npx expo config --type public
```

## Production Android and iOS builds

This app is configured for EAS Build with:

- Android package: `com.fixmyday.app`
- iOS bundle identifier: `com.fixmyday.app`
- Production Android output: `.aab` for Google Play
- Preview Android output: `.apk` for direct testing

For first Android user testing, build the preview APK:

```bash
docker compose run --rm fix-my-day npm run build:android:apk
```

EAS will return a download link when the build finishes. Share that APK only with trusted testers.

Authenticate with Expo from Docker.

Use CLI login, not browser login. Browser login starts a localhost callback inside Docker and the Windows browser may show `localhost refused to connect`.

```bash
docker compose run --rm fix-my-day npm run login:expo
```

Confirm login:

```bash
docker compose run --rm fix-my-day npm run whoami:expo
```

Or use an Expo access token:

```bash
set EXPO_TOKEN=your_token_here
docker compose run --rm fix-my-day npm run build:all
```

If you use GitHub to sign in to Expo, the access token flow is usually the easiest Docker path. Create a token from your Expo account settings, set `EXPO_TOKEN`, then run the build command.

Build production binaries:

```bash
docker compose run --rm fix-my-day npm run build:android
docker compose run --rm fix-my-day npm run build:ios
```

Build both platforms:

```bash
docker compose run --rm fix-my-day npm run build:all
```

Build tester builds:

```bash
docker compose run --rm fix-my-day npm run build:preview:android
docker compose run --rm fix-my-day npm run build:preview:ios
```

iOS production builds require an Apple Developer account for signing. Android production builds require a Google Play developer account when you are ready to submit the generated `.aab`.

## Notes before first user testing

- No backend is connected.
- No real payments are connected.
- Premium features are represented in `src/data/premiumFeatures.ts`.
- Local progress can be cleared from Settings.
- EAS requires Expo login or `EXPO_TOKEN`; this repo is otherwise ready for Android preview builds.
