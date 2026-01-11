function TerminalContent() {
    
}

function Terminal() {
  return (
    <div id='terminal-container'>
        <div id="terminal-display">
            <TerminalContent />
        </div>
        <div id="cmd-container">
            <input type="text" id="cmd-input" />
            <button type="submit" id="cmd-submit"></button>
        </div>
    </div>
  );
}

export default Terminal;