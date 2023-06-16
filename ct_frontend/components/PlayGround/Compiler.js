import React from "react";
import { languages, themes } from "../Constants";
import dynamic from "next/dynamic";
import Autosuggestion from "./Autosuggestion";
const AceEditor = dynamic(async () => {
  const ace = await import("react-ace");

  languages.forEach((lang) => {
    if (lang === "c" || lang === "cpp") {
      console.log(lang);
      require(`ace-builds/src-noconflict/mode-c_cpp`);
      require("ace-builds/src-noconflict/ext-language_tools");
    } else {
      require(`ace-builds/src-noconflict/mode-${lang}`);
      require("ace-builds/src-noconflict/ext-language_tools");
    }
  });
  themes.forEach((theme) => {
    require(`ace-builds/src-noconflict/theme-${theme}`);
  });
  return ace;
});

export default function CodeComplier({
  height,
  width,
  defaultValue,
  mode,
  theme,
  handleChange,
  handleSave,
  editorVal,
  className,
}) {
  return (
    <>
      {
        //  <Autosuggestion />
      }
      <AceEditor
        mode={mode}
        theme={theme}
        fontSize={17}
        highlightActiveLineNumber={true}
        showGutter={true}
        highlightActiveLine={true}
        height={height}
        width={width}
        defaultValue={defaultValue}
        value={editorVal}
        onChange={handleChange}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
        }}
        showPrintMargin={false}
      />
    </>
  );
}
