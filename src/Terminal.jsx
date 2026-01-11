import React, { useState } from 'react';

let terminalHistory = [];

const commandPalette = {
  'ajuda': {
    desc: 'Lista a paleta de comandos.',
    exe: () => {
      const _list = Object.keys(commandPalette).map((cmd) => `${cmd}: ${commandPalette[cmd].desc}`).join('\n');
      return _list;
    }
  },
  'limpar': {
    desc: 'Limpa o terminal.',
    exe: () => {
      return 'clear';
    }
  },
  'data': {
    desc: 'Mostra a data atual.',
    exe: () => {
      return new Date().toLocaleDateString('pt-BR');
    }
  }
};

function Terminal() {
  const [terminalContent, setTerminalContent] = useState(['Bem vindo(a)!', 'Digite "ajuda" para paleta de comandos.']);
  const [inputValue, setInputValue] = useState('');

  const parseInput = (input) => {
    if (input.trim() === '') return;

    terminalHistory.push(input);

    const tokens = input.trim().split(' ');
    const command = tokens[0].toLowerCase();
    const args = tokens.slice(1);

    if (commandPalette[command]) { return commandPalette[command].exe(setTerminalContent, args); }
    else { return `Comando "${command}" desconhecido.\nDigite "ajuda" para paleta de comandos.`; }
  };

  const submitInput = () => {
    const inputText = inputValue.trim();
    if (inputText === '') return;

    const userLine = `> ${inputText}`;
    const responseLine = `${parseInput(inputText)}`;

    if (responseLine === 'clear') { setTerminalContent([]); }
    else {
      setTerminalContent(prev => {
        const newLines = [...prev, userLine];
        if (responseLine !== null && responseLine !== undefined) {
          if(Array.isArray(responseLine)) { newLines.push(...responseLine); }
          else { newLines.push(responseLine); }
        }
        return newLines;
      });
    }

    setInputValue('');
  };

  return (
    <div id='terminal-container'>
      <h1>Terminal</h1>
      <div id="terminal-display">
          {terminalContent.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
      </div>
      <div id="cmd-container">
          <input type="text" id="cmd-input" value={inputValue} onChange={(event) => { setInputValue(event.target.value); }} onKeyDown={(event) => { if (event.key === 'Enter') submitInput(); }}/>
          <button type="submit" id="cmd-submit" onClick={ submitInput }>Enviar</button>
      </div>
    </div>
  );
}

export default Terminal;