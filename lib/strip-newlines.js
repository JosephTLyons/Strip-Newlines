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
        let allText = editor.getText();
        let newlinesConvertedToLF = false;

        // If text contain CRLF, convert to LF
        if (allText.includes ("\r\n"))
        {
            allText = allText.replace (/\r\n/g, "\n");
            newlinesConvertedToLF = true;
        }

        // Strip newlines
        let consecutiveNewlinesAllowed = atom.config.get ('strip-newlines.consecutiveNewlinesAllowed');
        let regex = RegExp ("(\n){" + (consecutiveNewlinesAllowed + 1) + ",}", "g");
        let newlineString = "\n".repeat (consecutiveNewlinesAllowed);

        allText = allText.replace (regex, newlineString);

        // If text was converted to LF, convert back to CRLF
        if (newlinesConvertedToLF)
            allText = allText.replace (/\n/g, "\r\n");

        editor.setText (allText);
}
