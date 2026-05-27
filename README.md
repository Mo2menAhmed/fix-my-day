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

Docker sets `EAS_NO_VCS=1` because the lightweight container image does not include Git. The local repository still uses Git normally.

Docker checks:

```bash
docker exec fix-my-day npm run typecheck
docker exec fix-my-day npx expo config --type public
```

## Android and iOS builds

This app is configured for EAS Build with:

- Android package: `com.fixmyday.app`
- iOS bundle identifier: `com.fixmyday.app`
- Production Android output: `.aab` for Google Play
- Preview Android output: `.apk` for direct testing

### Android APK for first testers

Use this for direct install on Android devices:

```bash
docker compose run --rm fix-my-day npm run build:android:apk
```

EAS will return a download link when the build finishes. Share that APK only with trusted testers.

### Local Android APK in Docker

Use this when you want Docker to build the APK locally instead of using EAS cloud builders:

```bash
docker compose run --rm fix-my-day npm run build:android:apk:local
```

The APK will be written inside Docker's `myday_build-artifacts` named volume. Copy it back to the repo with:

```powershell
docker create --name fix-my-day-artifacts -v myday_build-artifacts:/artifacts alpine
docker cp fix-my-day-artifacts:/artifacts ./build-artifacts
docker rm fix-my-day-artifacts
```

Check a build:

```bash
docker compose run --rm fix-my-day npx eas-cli build:list --platform android --limit 5
```

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

```powershell
$env:EXPO_TOKEN="your_token_here"
docker compose run --rm fix-my-day npm run whoami:expo
```

If you use GitHub to sign in to Expo, the access token flow is usually the easiest Docker path. Create a token from your Expo account settings, set `EXPO_TOKEN`, then run the build command.

### Android AAB for Google Play

Use this for Google Play production upload:

```bash
docker compose run --rm fix-my-day npm run build:android
```

Local Docker AAB build:

```bash
docker compose run --rm fix-my-day npm run build:android:aab:local
```

The AAB will be written inside Docker's `myday_build-artifacts` named volume. Copy it back to the repo with:

```powershell
docker create --name fix-my-day-artifacts -v myday_build-artifacts:/artifacts alpine
docker cp fix-my-day-artifacts:/artifacts ./build-artifacts
docker rm fix-my-day-artifacts
```

### iOS later

```bash
docker compose run --rm fix-my-day npm run build:ios
```

### Build all production platforms

```bash
docker compose run --rm fix-my-day npm run build:all
```

iOS production builds require an Apple Developer account for signing. Android production builds require a Google Play developer account when you are ready to submit the generated `.aab`.

## Notes before first user testing

- No backend is connected.
- No real payments are connected.
- Premium features are represented in `src/data/premiumFeatures.ts`.
- Local progress can be cleared from Settings.
- EAS requires Expo login or `EXPO_TOKEN`; this repo is otherwise ready for Android preview builds.
- Local Android builds run in Docker with JDK 17, Android SDK command line tools, Android build tools, NDK/CMake, and a persistent Gradle cache. iOS local builds are not supported on Windows/Linux Docker because iOS requires macOS and Xcode.
