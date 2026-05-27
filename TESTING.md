# Fix My Day Android Test Checklist

Use this checklist for the first installable Android APK test.

## Install

- Download the APK from the EAS cloud build link or copy it from `build-artifacts/`.
- If a previous Fix My Day APK is installed, uninstall it first or run `adb uninstall com.fixmyday.app`.
- Install it on a real Android phone.
- If Android blocks unknown apps, allow installs from the browser or file manager you are using.

## First App Open

- Open Fix My Day.
- Confirm the splash screen appears.
- Confirm onboarding appears for a first-time user.
- Complete onboarding and land on Home.

## Core Flow

- Choose a problem category.
- Choose a time option.
- View the recovery plan.
- Confirm the title, encouragement, steps, checklist, and total time are visible.
- Complete and uncomplete checklist items.
- Leave the plan screen and return to confirm checklist progress persists.

## Focus Timer

- Start the timer.
- Pause the timer.
- Resume the timer.
- Reset the timer.
- Let it reach completion if practical.
- Tap finish/save completion.

## Reflection

- Choose a mood.
- Enter a short reflection.
- Save the completed session.
- Confirm the saved state appears.

## Persistence

- Close the app completely.
- Reopen the app.
- Confirm onboarding does not show again.
- Confirm completed session data is reflected in Settings/Home.
- Confirm favorites and preferences persist.

## Settings

- Toggle gentle mode.
- Toggle sound cues.
- Change default plan length.
- Open the premium placeholder.
- Return to Settings.
- Use "Show onboarding again" and confirm onboarding can be replayed.

## Premium Placeholder

- Confirm no real payment screen appears.
- Confirm premium feature copy is placeholder-only.

## Notes

- Record any confusing copy, layout clipping, crashes, slow screens, or data that does not persist.
- Attach screenshots or short videos when possible.
- For launch crashes or blank screens, attach filtered logs from `adb logcat AndroidRuntime:E ReactNativeJS:E ReactNative:E FixMyDay:D *:S`.
