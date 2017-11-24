'use babel';

import StripNewlinesView from './strip-newlines-view';
import { CompositeDisposable } from 'atom';

export default {

  stripNewlinesView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.stripNewlinesView = new StripNewlinesView(state.stripNewlinesViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.stripNewlinesView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'strip-newlines:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.stripNewlinesView.destroy();
  },

  serialize() {
    return {
      stripNewlinesViewState: this.stripNewlinesView.serialize()
    };
  },

toggle()
{
    let editor
    if (editor = atom.workspace.getActiveTextEditor())
    {
        let allText = editor.getText();
        var newlinesIgnored = 0
        for (var i = 0; i < allText.length; i++)
        {
            if (allText[i] == '\n')
            {
                // Make '2' a default setting in atom package (learn how)
                // This is the amount of newlines the algorithm will ignore before stripping begins
                if (newlinesIgnored++ >= 2)
                {
                    allText = allText.slice (0, i) + allText.slice (i + 1, allText.length);

                    // Decrement to account for string losing one element in line above
                    i--;
                }
            }

            else
                newlinesIgnored = 0;
        }

        editor.setText (allText);
    }
}

};
