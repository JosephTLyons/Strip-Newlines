'use babel';

import { CompositeDisposable } from 'atom';

export default
{
    subscriptions: null,

    activate()
    {
        this.subscriptions = new CompositeDisposable()

        this.subscriptions.add(atom.commands.add('atom-workspace', {
          'strip-newlines:stripNewlines': () => this.stripNewlines()
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

            editor.setText (allText);
        }
    }
};
