# Change Log

## [0.5.0]

- feat: Added settings to custom the generated state class.
- fix: fixed where the `on<Event>(_onEvent)` is not able to add to a empty constructor.

## [0.4.0]

- feat: now bloc import will match the bloc package used in the pubspec.yaml, or you can override in the setting.

## [0.3.1]
- Changeed event handler method name to `_onEventName`. Thanks to [elliotsayes](https://github.com/elliotsayes)

## [0.3.0]
- removed bloc suffix on the generated bloc folder.
- template updated to match the bloc version ^8.0.0. Thanks to [jorgesarabia](https://github.com/jorgesarabia)

## [0.2.5]

- feat: new snippets (`fadd`,`maybeMap`,`maybeMap*`)
- removed event1 from the generated event file.

## [0.2.4]

- optimized `create new bloc event`.
- the event file will be automatically saved after the command.

## [0.2.3]

- fix: fixed typo.
- removed snippets

## [0.2.2]

- fix: added `async*` keyword for the generated eventToState function.

## [0.2.1]

- feat: add new bloc event using command.`create new bloc event` (usable but likely to cause bugs)

## [0.2.0]

- **breaking**: changed from `event` to `gEvent`
- renamed `fmap` snippet to `fmapToState`
- added new snippet `ftoStateMap` for create new sub mapEventToState function for using `freezed.map`

## [0.1.1]

- dependcy update

## [0.1.0]

- updated to bloc version 5

## [0.0.3]

- added exmaple usage.

## [0.0.2]

- changed placeholder position in the snippet.

## [0.0.1]

- Initial release
