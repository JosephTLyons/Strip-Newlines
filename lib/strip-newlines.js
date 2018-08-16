module.exports =
{
    activate()
    {
        this.commandsDisposable = atom.commands.add('atom-text-editor:not([mini])',
        {
            'strip-newlines:toggle' ()
            {
                stripNewlines (atom.workspace.getActiveTextEditor())
            }
        })
    },

    deactivate()
    {
        this.commandsDisposable.dispose()
    }
}

function stripNewlines(editor)
{
        let allText = editor.getText();
        let newlinesWereConvertedToLF = false;

        // If text contain CRLF, convert to LF
        if (allText.includes ("\r\n"))
        {
            allText = allText.replace (/\r\n/g, "\n");
            newlinesWereConvertedToLF = true;
        }

        // Strip newlines
        let ignoreCount = atom.config.get ('strip-newlines.consecutiveNewlinesAllowed');
        let regex = RegExp ("[\n]{" + ignoreCount + ", 1000}", "g");
        let endlineString = "\n".repeat (ignoreCount);

        allText = allText.replace (regex, "");

        // If text was converted to LF, convert back to CRLF
        if (newlinesWereConvertedToLF)
            allText = allText.replace (/\n/g, "\r\n");

        editor.setText (allText);
}
