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

function stripNewlines (editor)
{
        let text = editor.getText();
        let newlinesWereConvertedToLF = false;

        // If text contain CRLF, convert to LF
        if (text.includes ("\r\n"))
        {
            text = text.replace (/\r\n/g, "\n");
            newlinesWereConvertedToLF = true;
        }

        // Strip newlines
        let consecutiveNewlinesAllowed = atom.config.get ('strip-newlines.consecutiveNewlinesAllowed');
        let regex = RegExp ("(\n){" + (consecutiveNewlinesAllowed + 1) + ",}", "g");
        let newlineString = "\n".repeat (consecutiveNewlinesAllowed);

        text = text.replace (regex, newlineString);

        // If text was converted to LF, convert back to CRLF
        if (newlinesWereConvertedToLF)
            text = text.replace (/\n/g, "\r\n");

        editor.setText (text);
}
