# Strip Newlines
Strips out unnecessary newlines (LF) from files.

## Current Features:

* This package will strip out any newlines after any 2 occurrences.  The reasoning behind using the value 2 is we often use one blank line to mark the end of one code block and the beginning of another; this blank line consists of two newlines.  Using the value of 2 means that these blank lines will not be removed.

## Future Features:

* Ability to set the ignore value from the default (2) to any value, in the package settings.
* Ability to strip out CRLF lines.
