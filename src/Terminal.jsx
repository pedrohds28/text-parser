import React, { useState, useEffect, useRef } from 'react';
import { evaluate } from 'mathjs';

let terminalHistory = [];

const validateResponse = (response, errorMessage = "Erro na operação.") => {
  if (response === null || response === undefined || Number.isNaN(response)) {
    return errorMessage;
  }
  return response;
};

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
  },
  'calcular': {
    desc: 'Calcula o resultado. Sintaxe: calcular [expressão]',
    exe: (args) => {
      if (!args.length) return 'Forneça uma expressão. Ex: calcular 1 + 2';

      try {
        const exp = args.join(' ').replace(/,/g, '.');
        const result = evaluate(exp);
        return `O resultado é: ${validateResponse(result, 'Erro matemático.')}`;
      } catch (error) {
        console.error("[Mathjs] Erro ao calcular:", error);
        return 'Erro de sintaxe na expressão.';
      }
    }
  },
  'sortear': {
    desc: 'Sorteia um inteiro. Sintaxe: sortear [min] [max]',
    exe: (args) => {
      const min = parseInt(args[0]);
      const max = parseInt(args[1]);

      if (isNaN(min) || isNaN(max)) return 'Forneça números inteiros válidos.';
      if (min >= max) return 'O valor mínimo deve ser menor que o máximo.';

      const resultado = Math.floor(Math.random() * (max - min + 1) + min);
      return validateResponse(resultado);
    }
  }
};

function Terminal() {
  const [terminalContent, setTerminalContent] = useState(['Bem vindo(a)!', 'Digite "ajuda" para paleta de comandos.']);
  const [inputValue, setInputValue] = useState('');
  const displayRef = useRef(null);

  const parseInput = (input) => {
    if (input.trim() === '') return;

    terminalHistory.push(input);

    const tokens = input.trim().split(' ');
    const command = tokens[0].toLowerCase();
    const args = tokens.slice(1);

    if (commandPalette[command]) { return commandPalette[command].exe(args); }
    else { return `Comando "${command}" desconhecido.\nDigite "ajuda" para paleta de comandos.`; }
  };

  const submitInput = () => {
    const inputText = inputValue.trim();
    if (inputText === '') return;

    const userLine = `> ${inputText}`;
    const responseLine = `${parseInput(inputText)}`;

    if (responseLine === 'clear') { setTerminalContent(['Bem vindo(a)!', 'Digite "ajuda" para paleta de comandos.']); }
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

  useEffect(() => {
    if (displayRef.current) {
      displayRef.current.scrollTop = displayRef.current.scrollHeight
    }
  }, [terminalContent]);

  return (
    <div id='terminal-container'>
      <h1>Terminal</h1>
      <div id="terminal-display" ref={displayRef}>
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