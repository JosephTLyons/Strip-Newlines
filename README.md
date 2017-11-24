# Strip Newlines
An [Atom](https://atom.io) text editor package that strips out unnecessary newlines (LF) from files.

## Before
![alt tag](https://raw.githubusercontent.com/JosephTLyons/Strip-Newlines/master/Screenshots/Before.png)

## After
![alt tag](https://raw.githubusercontent.com/JosephTLyons/Strip-Newlines/master/Screenshots/After.png)

## Current Features:

* This package will strip out any newlines after any 2 occurrences.  The reasoning behind using the value 2 is we often use one blank line to mark the end of one code block and the beginning of another; this blank line consists of two newlines.  Using the value of 2 means that these blank lines will not be removed.

## Future Features:

* Ability to strip out CRLF lines.
