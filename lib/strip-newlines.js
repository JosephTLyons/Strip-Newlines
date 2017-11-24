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
        let selection = editor.getText();

        for (var i = 0; i < selection.length; i++)
        {
            if (selection[i] == '\n')
            {
                // Use the ignore number to change how many are skipped
                // This can be made into an atom package setting (with default of 2)
                var ignore = 2;
                var j = i;

                for (var j = i; selection[j] == '\n'; j++)
                {
                    if (ignore == 0)
                    {
                        selection = selection.slice (0, j) + selection.slice (j + 1, selection.length);
                    }

                    else
                        ignore--;
                }
            }
        }
        editor.setText (selection);
    }
}

};
