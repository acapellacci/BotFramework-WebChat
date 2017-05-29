"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var Chat_1 = require("./Chat");
var react_redux_1 = require("react-redux");
var ShellContainer = (function (_super) {
    tslib_1.__extends(ShellContainer, _super);
    function ShellContainer(props) {
        return _super.call(this, props) || this;
    }
    ShellContainer.prototype.sendMessage = function () {
        if (this.props.inputText.trim().length > 0)
            this.props.sendMessage(this.props.inputText);
    };
    ShellContainer.prototype.onKeyPress = function (e) {
        if (e.key === 'Enter')
            this.sendMessage();
    };
    ShellContainer.prototype.onClickSend = function () {
        this.textInput.focus();
        this.sendMessage();
    };
    ShellContainer.prototype.onChangeFile = function () {
        this.textInput.focus();
        this.props.sendFiles(this.fileInput.files);
        this.fileInput.value = null;
    };
    ShellContainer.prototype.render = function () {
        var _this = this;
        var className = 'wc-console';
        if (this.props.inputText.length > 0)
            className += ' has-text';
        return (React.createElement("div", { className: "wc-console-background" },
            React.createElement("div", { className: className },
                React.createElement("input", { id: "wc-upload-input", type: "file", ref: function (input) { return _this.fileInput = input; }, multiple: true, onChange: function () { return _this.onChangeFile(); } }),
                React.createElement("label", { className: "wc-upload", htmlFor: "wc-upload-input" },
                    React.createElement("p", null, "SEND")),
                React.createElement("div", { className: "wc-textbox" },
                    React.createElement("input", { type: "text", className: "wc-shellinput", ref: function (input) { return _this.textInput = input; }, autoFocus: true, value: this.props.inputText, onChange: function (_) { return _this.props.onChangeText(_this.textInput.value); }, onKeyPress: function (e) { return _this.onKeyPress(e); }, placeholder: this.props.strings.consolePlaceholder })),
                React.createElement("label", { className: "wc-send", onClick: function () { return _this.onClickSend(); } },
                    React.createElement("p", null, "SEND")))));
    };
    return ShellContainer;
}(React.Component));
exports.Shell = react_redux_1.connect(function (state) { return ({
    // passed down to ShellContainer
    inputText: state.shell.input,
    strings: state.format.strings,
    // only used to create helper functions below
    locale: state.format.locale,
    user: state.connection.user,
}); }, {
    // passed down to ShellContainer
    onChangeText: function (input) { return ({ type: 'Update_Input', input: input }); },
    // only used to create helper functions below
    sendMessage: Chat_1.sendMessage,
    sendFiles: Chat_1.sendFiles
}, function (stateProps, dispatchProps, ownProps) { return ({
    // from stateProps
    inputText: stateProps.inputText,
    strings: stateProps.strings,
    // from dispatchProps
    onChangeText: dispatchProps.onChangeText,
    // helper functions
    sendMessage: function (text) { return dispatchProps.sendMessage(text, stateProps.user, stateProps.locale); },
    sendFiles: function (files) { return dispatchProps.sendFiles(files, stateProps.user, stateProps.locale); }
}); })(ShellContainer);
//# sourceMappingURL=Shell.js.map