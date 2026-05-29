# Fix My Day 5-User Android Feedback Test

Use this checklist for a small first feedback test with five Android users.

## Test Setup

- Recruit five people who have stressful, messy, study, work, sleep, or planning days.
- Ask each tester to use the APK alone for 10 to 15 minutes.
- Do not explain the app before they open it. The first 20 seconds should make the value clear.
- Ask them to speak out loud if possible: what they think the app does, what they expect to tap, and where they feel unsure.
- After the test, ask the questions in `FEEDBACK_FORM.md`.

## Install

- Download the APK from the EAS cloud build link or copy it from `build-artifacts/`.
- If a previous Fix My Day APK is installed, uninstall it first or run `adb uninstall com.fixmyday.app`.
- Install it on a real Android phone.
- If Android blocks unknown apps, allow installs from the browser or file manager you are using.

## First 20 Seconds

- Open Fix My Day.
- Confirm the splash screen appears.
- Confirm the first visible control includes "Choose your language / اختر اللغة".
- Switch between English, العربية, and مصري before completing onboarding.
- Confirm the selected language is visually obvious.
- Confirm onboarding explains:
  - what the app does
  - who it helps
  - the first action to take
- Ask the tester what they would tap next before they tap anything.
- Complete onboarding and land on Home.

## Home Screen

- Confirm the language selector is visible near the top of Home.
- Switch languages from Home and confirm the Home copy and category cards update immediately.
- Confirm the emotional copy feels clear and calming.
- Confirm the tester understands the completed resets, streak, and default plan counters.
- Confirm the tester understands recent resets if history exists.
- Confirm the tester can identify the best matching problem category.

## Arabic Language Check

- Open Settings.
- Switch Language to العربية.
- Confirm Home, problem categories, time selection, recovery plans, timer, reflection, settings, and premium placeholder show Arabic copy.
- Confirm Arabic text is readable, right-aligned where expected, and not clipped.
- Switch Language to مصري.
- Confirm the same screens use natural Egyptian Arabic copy, especially the Home categories and recovery plan steps.
- Complete one Arabic reset and confirm recent history can repeat it.
- Switch back to English and confirm the app updates without losing local progress.

## Core Flow

- Choose a problem category.
- Choose a time option.
- View the recovery plan.
- Confirm the title, encouragement, quick win, timed steps, checklist, and total time are visible.
- Ask whether the plan feels personal enough for the selected problem.
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

## Retention

- Return Home.
- Confirm completed resets count updated.
- Confirm recent session appears.
- Tap Repeat on a recent reset and confirm the plan opens again.
- Close the app completely.
- Reopen the app.
- Confirm onboarding does not show again.
- Confirm completed session data, favorites, checklist progress, and preferences persist.

## Settings

- Toggle gentle mode.
- Toggle sound cues.
- Change default plan length.
- Open the premium placeholder.
- Return to Settings.
- Use "Show onboarding again" and confirm onboarding can be replayed.

## Premium Placeholder

- Confirm no real payment screen appears.
- Ask whether the future premium benefits are understandable.
- Ask which benefit is most valuable: unlimited plans, advanced reset packs, study mode, work mode, sleep reset, or no ads.

## Notes

- Record confusing copy, layout clipping, crashes, slow screens, repeated taps, or data that does not persist.
- Attach screenshots or short videos when possible.
- For launch crashes or blank screens, attach filtered logs from `adb logcat AndroidRuntime:E ReactNativeJS:E ReactNative:E FixMyDay:D *:S`.
