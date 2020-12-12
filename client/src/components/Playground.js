import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import Editor from './Editor';
import Browser from './Browser';
import Console from './Console';

/**
 * Separating to its own component cuz divitis
 */
const PlaygroundHeader = ({ title, runCode }) => (
  <div className="playground-header">
    <div className="columns">
      <div className="column">
        <h2 className="title is-6">{title}</h2>
      </div>
      <div style={{ marginBottom: "1em" }}>
        <Button onClick={runCode}>Execute</Button>
      </div>
    </div>
  </div>
);

/**
 * The main playground component
 * Get a gist and only pull the first file of each .html, .css, .js
 */
export default class Playground extends Component {
  state = {
    history: [],
    title: '',
    html: '',
    css: '',
    js: '',
    isProcessing: false // tiny way to stop a user from hitting run 10000 times in a row
  };

  // helpers
  setTitle = title => this.setState({ title });
  setHistory = history => this.setState({ history });
  setHtml = html => this.setState({ html });
  setCss = css => this.setState({ css });
  setJs = js => this.setState({ js });

  // componentDidUpdate() {
  //   this.setJs(this.props.code);
  // }

  addHistory = text => {
    const newHistory = [...this.state.history, { text }];
    this.setHistory(newHistory);
  };

  clearHistory = () => this.setHistory([]);

  /**
   * Since our browser only runs when code is changed, we set things to blank and then reset them
   * TODO: Probably a better way to do this than the setTimeout()
   */
  runCode = () => {
    if (this.state.isProcessing) return false;
    this.setState({ isProcessing: true });

    const { html, css, js } = this.state;
    this.setHtml('');
    this.setCss('');
    this.setJs('');

    setTimeout(() => {
      this.setHtml(html);
      this.setCss(css);
      this.setJs(js);
      this.setState({ isProcessing: false });
    }, 250);
  };

  render() {
    const { history, title, html, css, js } = this.state;
    const { playgroundId } = this.props;

    return (
      <div className="playground">
        <PlaygroundHeader title={title} runCode={this.runCode} />

        <div className="playground-content">
          <Editor language="javascript" code={js} updateCode={this.setJs} />

          {/* browser will run all of our code in an iframe */}
          <Browser
            playgroundId={playgroundId}
            html={html}
            css={css}
            js={js}
            addHistory={this.addHistory}
          />

          {/* console only shows the output of history */}
          <Console history={history} clearHistory={this.clearHistory} />
        </div>
      </div>
    );
  }
}
