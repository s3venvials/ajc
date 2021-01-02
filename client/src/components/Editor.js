import React, { useState, useEffect, Component } from "react";
import debounce from "lodash.debounce";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/neat.css";
require("codemirror/mode/css/css");
require("codemirror/mode/javascript/javascript");

// const Editor = (props) => {
//   const [code, setCode] = useState("");

//   useEffect(() => {
//     if (props.code) setCode(props.code);
//   }, [props.code]);

//   const handleChange = (code) => {
//     setCode(code);
//     debouncedUpdate(code);
//   };

//   const debouncedUpdate = debounce((code) => {
//     props.updateCode(code);
//   }, 500);

//   const { language } = props;
//   const options = { lineNumbers: true, mode: language, theme: "neat" };

//   return (
//     <div className="playground-editor">
//       <CodeMirror
//         value={code}
//         onBeforeChange={handleChange}
//         options={options}
//       />
//     </div>
//   );
// };

// export default Editor;

export default class Editor extends Component {
  state = { value: this.props.code };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.code !== this.props.code)
      this.setState({ value: this.props.code });
  }

  handleChange = (editor, data, value) => {
    this.setState({ value });
    this.debouncedUpdate(value);
  };

  debouncedUpdate = debounce((value) => {
    this.props.updateCode(value);
  }, 500);

  render() {
    const { value } = this.state;
    const { language } = this.props;
    const options = { lineNumbers: true, mode: language, theme: "neat" };

    return (
      <div className="playground-editor">
        <CodeMirror
          value={value}
          onBeforeChange={this.handleChange}
          options={options}
        />
      </div>
    );
  }
}
