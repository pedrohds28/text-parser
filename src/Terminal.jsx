function TerminalContent() {
  let _cmds = ['Hello World!', 'Hello Universe!'];
  return (
    <>
      {_cmds.map((message) => (
        <div>{message}</div>
      ))}
    </>
  )
}

function Terminal() {
  return (
    <div id='terminal-container'>
      <h1>Terminal</h1>
      <div id="terminal-display">
          <TerminalContent />
      </div>
      <div id="cmd-container">
          <input type="text" id="cmd-input" />
          <button type="submit" id="cmd-submit">Enviar</button>
      </div>
    </div>
  );
}

export default Terminal;