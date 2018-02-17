# Strip Newlines
An [Atom](https://atom.io) text editor package that strips out unnecessary newlines (LF) from files.

## Before
![alt tag](https://raw.githubusercontent.com/JosephTLyons/Strip-Newlines/master/Screenshots/Before.png)

## After
![alt tag](https://raw.githubusercontent.com/JosephTLyons/Strip-Newlines/master/Screenshots/After.png)

## Description:

* This package simply strips out newlines from source files.  In the settings, the user can select how many newlines are ignored before the stripping begins.  The default value of ignored newlines is 2.  The reasoning behind using the value 2 is we often use one blank line to mark the end of one code block and the beginning of another; this blank line consists of two newlines.  Using the value of 2 means that these blank lines will not be removed.

## Future Features:

* Ability to strip out CRLF lines (pull requests welcome!)

## Bug(s)

* Certain edge cases will cause the stripping to not work correctly
* Minimum value (0) may still allow for values below 0 - unsure.
* Text is randomly highlighted when using the right-click context menu to strip newlines.

## TODO:

* Refactor stripNewlines() into smaller functions
