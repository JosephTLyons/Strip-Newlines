## v1.1.1

- Added a .gif of `strip-lines` in action.
- Cleaned up `README.md`

## v1.1.0

- Replaced all custom code with regex code, which makes it more compact and easier to read.  It probably also makes it much more efficient and safe.

## v1.0.0

- Now supports CRLF style of newlines.  If you are using LF or CRLF newlines, strip-newlines will preserve this.  However, it should be noted that if you are using mixed newlines, all of your newlines will be converted to CRLF, due to the way the algorithm is designed.

## v0.2.2

- v0.2.1 severed the link between the package menu and context menu commands (nothing would happen), this fixes it.

## v0.2.1

- Command Palette option is now two words.  Was "StripNewlines" before.

## v0.2.0

- Added a setting in the package settings that allows the user to set the minimum amount of newlines skipped before the stripping process starts.  This setting defaults to 2.

## v0.1.1

- Fixed a bug relating to the stripping algorithm not working in certain edge cases.

## v0.1.0

- Initial release
