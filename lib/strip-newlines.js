'use babel';

import { CompositeDisposable } from 'atom';

export default
{
    subscriptions: null,

    activate()
    {
        this.subscriptions = new CompositeDisposable()

        this.subscriptions.add(atom.commands.add('atom-workspace', {
          'strip-newlines:strip-Newlines': () => this.stripNewlines()
        }))
    },

    deactivate()
    {
        this.subscriptions.dispose()
    },

    stripNewlines()
    {
        let editor;
        if (editor = atom.workspace.getActiveTextEditor())
        {
            let allText = editor.getText();
            let newlinesWereConverted = false;

            // Convert all CRLF returns to LF temporarily,
            // This keeps me from having to write a new detection method.
            if (allText.includes("\r\n"))
            {
                allText = allText.replace(/\r\n/g, "\n");
                newlinesWereConverted = true;
            }

            //atom.commands.dispatch(atom.views.getView(atom.workspace), "line-ending-selector:convert-to-LF");

            let newlinesIgnored = 0;

            for (let i = 0; i < allText.length; i++)
            {
                if (allText[i] == '\n')
                {
                    if (newlinesIgnored++ >= atom.config.get ('strip-newlines.consecutiveNewlinesAllowed'))
                    {
                        allText = allText.slice (0, i) + allText.slice (i + 1, allText.length);

                        // Decrement to account for string losing one element in line above
                        i--;
                    }
                }

                // Do nothing if a space exists in between newlines
                else if (allText[i] != ' ')
                    newlinesIgnored = 0;
            }

            // Turn LF newlines back to CRLF newlines
            if (newlinesWereConverted)
                allText = allText.replace(/\n/g, "\r\n");

            editor.setText (allText);
        }
    }
};
