import * as React from 'react';
import { ChatActions, ChatState, FormatState } from './Store';
import { User } from 'botframework-directlinejs';
import { sendMessage, sendFiles } from './Chat';
import { Dispatch, connect } from 'react-redux';
import { Strings } from './Strings';

interface Props {
    inputText: string,
    strings: Strings,

    onChangeText: (inputText: string) => void

    sendMessage: (inputText: string) => void,
    sendFiles: (files: FileList) => void,
}

class ShellContainer extends React.Component<Props, {}> {
    private textInput: HTMLInputElement;
    private fileInput: HTMLInputElement;

    constructor(props: Props) {
        super(props);
    }

    private sendMessage() {
        if (this.props.inputText.trim().length > 0)
            this.props.sendMessage(this.props.inputText);
    }

    private onKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter')
            this.sendMessage();
    }

    private onClickSend() {
        this.textInput.focus();
        this.sendMessage();
    }

    private onChangeFile() {
        this.textInput.focus();
        this.props.sendFiles(this.fileInput.files);
        this.fileInput.value = null;
    }

    render() {
        let className = 'wc-console';
        if (this.props.inputText.length > 0) className += ' has-text';

        return (
            <div className="wc-console-background">
                <div className={className}>
                    <input id="wc-upload-input" type="file" ref={ input => this.fileInput = input } multiple onChange={ () => this.onChangeFile() } />
                    <label className="wc-upload" htmlFor="wc-upload-input">
                        <p>
                            SEND
                        </p>
                    </label>
                    <div className="wc-textbox">
                        <input
                            type="text"
                            className="wc-shellinput"
                            ref={ input => this.textInput = input }
                            autoFocus
                            value={ this.props.inputText }
                            onChange={ _ => this.props.onChangeText(this.textInput.value) }
                            onKeyPress={ e => this.onKeyPress(e) }
                            placeholder={ this.props.strings.consolePlaceholder }
                        />
                    </div>
                    <label className="wc-send" onClick={ () => this.onClickSend() } >
                        <p>
                            SEND
                        </p>
                    </label>
                </div>
            </div>
        );
    }
}

export const Shell = connect(
    (state: ChatState) => ({
        // passed down to ShellContainer
        inputText: state.shell.input,
        strings: state.format.strings,
        // only used to create helper functions below
        locale: state.format.locale,
        user: state.connection.user,
    }), {
        // passed down to ShellContainer
        onChangeText: (input: string) => ({ type: 'Update_Input', input } as ChatActions),
        // only used to create helper functions below
        sendMessage,
        sendFiles
    }, (stateProps: any, dispatchProps: any, ownProps: any): Props => ({
        // from stateProps
        inputText: stateProps.inputText,
        strings: stateProps.strings,
        // from dispatchProps
        onChangeText: dispatchProps.onChangeText,
        // helper functions
        sendMessage: (text: string) => dispatchProps.sendMessage(text, stateProps.user, stateProps.locale),
        sendFiles: (files: FileList) => dispatchProps.sendFiles(files, stateProps.user, stateProps.locale)
    })
)(ShellContainer);
