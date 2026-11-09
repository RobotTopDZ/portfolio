import { useState, useEffect, useRef, useCallback } from 'react';
import { useTerminal } from '../context/TerminalContext';
import styles from '../styles/FakeTerminal.module.css';

// ── Boot animation lines ─────────────────────────────────────────────────────
const BOOT_LINES = [
  'okhaldi@portfolio:~$ python train.py --model lkat-b --epochs 100',
  '',
  'Initializing...',
  'Loading dataset: imagenet-100  [████████████] 100%  14.2GB',
  'Building LKAT (Gated Linear Attention + KAN)... done',
  'Trainable parameters: 124,441,346',
  '',
  'Epoch  1/100  | loss: 2.4831 | val_acc: 23.4% | 42s/epoch',
  'Epoch  5/100  | loss: 1.8203 | val_acc: 41.2% | 38s/epoch',
  'Epoch 10/100  | loss: 1.2041 | val_acc: 58.7% | 35s/epoch',
  'Epoch 25/100  | loss: 0.6832 | val_acc: 74.3% | 33s/epoch',
  '⚠  GPU memory at 96%. Living dangerously.',
  'Epoch 50/100  | loss: 0.3421 | val_acc: 88.9% | 31s/epoch',
  '✓  Checkpoint saved → model_epoch50.pt',
  'Epoch 75/100  | loss: 0.1893 | val_acc: 93.2% | 30s/epoch',
  'Epoch 97/100  | loss: 0.0921 | val_acc: 96.1% | 29s/epoch',
  '✓  New best model! Saving → model_best.pt',
  'Epoch 100/100 | loss: 0.0891 | val_acc: 95.8% | 29s/epoch',
  '',
  'Training complete in 3h 42m 17s',
  'Best checkpoint: epoch 97 | val_acc: 96.1%',
];

// ── Command dictionary ───────────────────────────────────────────────────────
function runCommand(cmd) {
  const token = cmd.trim().toLowerCase();

  if (token === '') return null;

  if (token === 'help') {
    return [
      'Available commands:',
      '  help      — show this message',
      '  whoami    — who is Oussama Khaldi?',
      '  ls        — list portfolio sections',
      '  skills    — technical skill set',
      '  date      — current date and time',
      '  clear     — clear the terminal',
    ].join('\n');
  }

  if (token === 'whoami') {
    return [
      'Oussama Khaldi — AI R&D Engineer & ML Researcher',
      '',
      '  MSc ML for Data Science · Université Paris Cité',
      '  BSc Computer Science & Big Data · Aix-Marseille Université (Top of Class)',
      '  Focus: LLMs · AI Agents · RAG · Forecasting · Efficient Vision Models',
      '  Currently: AI R&D Engineer @ Atidgo (Marseille)',
      '  Hackathons: 1st AIM Agentic AI · 1st Algeria Data Cup · 2nd Yassir AI',
    ].join('\n');
  }

  if (token === 'ls') {
    return [
      'portfolio/',
      '  projects/   — research, LLM/RAG apps, AI platforms, data science',
      '  papers/     — peer-reviewed publications',
      '  github/     — repos + contribution calendar',
      '  resume/     — PDF curriculum vitae',
      '  contact/    — get in touch',
    ].join('\n');
  }

  if (token === 'skills') {
    return [
      'Languages   : Python · SQL · JavaScript · TypeScript · PHP · R',
      'DL / ML     : PyTorch · TensorFlow · Scikit-learn · Pandas',
      'LLMs        : AI agents · RAG · prompt engineering · orchestration',
      'Modeling    : NLP · time series forecasting · optimization · ViT/KAN',
      'MLOps       : ETL pipelines · monitoring · deployment workflows',
      'Web         : Next.js · FastAPI · Node.js · MongoDB',
      'Spoken      : French (C2) · English (C1)',
    ].join('\n');
  }

  if (token === 'date') {
    return new Date().toString();
  }

  if (token === 'clear') {
    return '__CLEAR__';
  }

  return `bash: ${cmd.trim()}: command not found  (try 'help')`;
}

// ── Prompt sub-components (styled spans) ─────────────────────────────────────
function Prompt() {
  return (
    <span>
      <span className={styles.promptUser}>okhaldi</span>
      <span className={styles.promptAt}>@</span>
      <span className={styles.promptPath}>portfolio</span>
      <span className={styles.promptAt}>:</span>
      <span className={styles.promptPath}>~</span>
      <span className={styles.promptSuffix}>$ </span>
    </span>
  );
}

// ── Component ────────────────────────────────────────────────────────────────
const FakeTerminal = () => {
  const { isOpen, toggleTerminal } = useTerminal();

  // Boot animation state
  const [bootLines, setBootLines]   = useState([]);
  const [bootDone, setBootDone]     = useState(false);

  // Interactive history: array of { cmd: string, output: string|null }
  const [history, setHistory]       = useState([]);
  const [inputValue, setInputValue] = useState('');

  const intervalRef = useRef(null);
  const bodyRef     = useRef(null);
  const inputRef    = useRef(null);

  // ── Boot animation ──────────────────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      // Reset every time the terminal opens
      setBootLines([]);
      setBootDone(false);
      setHistory([]);
      setInputValue('');

      let index = 0;
      intervalRef.current = setInterval(() => {
        index += 1;
        setBootLines(BOOT_LINES.slice(0, index));
        if (index >= BOOT_LINES.length) {
          clearInterval(intervalRef.current);
          setBootDone(true);
        }
      }, 120);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isOpen]);

  // ── Auto-focus input after boot ─────────────────────────────────────────
  useEffect(() => {
    if (bootDone && inputRef.current) {
      inputRef.current.focus();
    }
  }, [bootDone]);

  // ── Auto-scroll ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [bootLines, history]);

  // ── Command execution ────────────────────────────────────────────────────
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key !== 'Enter') return;
      e.preventDefault();

      const cmd    = inputValue;
      const output = runCommand(cmd);

      if (output === '__CLEAR__') {
        setBootLines([]);
        setHistory([]);
        setInputValue('');
        return;
      }

      setHistory((prev) => [...prev, { cmd, output }]);
      setInputValue('');
    },
    [inputValue],
  );

  // ── Click anywhere in body focuses input ────────────────────────────────
  const handleBodyClick = useCallback(() => {
    if (bootDone && inputRef.current) {
      inputRef.current.focus();
    }
  }, [bootDone]);

  return (
    <div className={`${styles.panel} ${isOpen ? styles.open : ''}`}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.tabActive}>TERMINAL</span>
          <span className={styles.shell}>bash</span>
        </div>
        <div className={styles.headerRight}>
          <button
            className={styles.closeBtn}
            onClick={toggleTerminal}
            aria-label="Close terminal"
          >
            ×
          </button>
        </div>
      </div>

      {/* Body */}
      <div className={styles.body} ref={bodyRef} onClick={handleBodyClick}>
        {/* Boot animation lines */}
        {bootLines.map((line, i) => (
          <div key={`boot-${i}`} className={styles.line}>
            {line || ' '}
          </div>
        ))}

        {/* Interactive history */}
        {bootDone &&
          history.map((entry, i) => (
            <div key={`hist-${i}`} className={styles.historyEntry}>
              <div className={styles.historyCmd}>
                <Prompt />
                {entry.cmd}
              </div>
              {entry.output != null && (
                <div
                  className={
                    entry.output.includes('command not found')
                      ? `${styles.historyOutput} ${styles.error}`
                      : styles.historyOutput
                  }
                >
                  {entry.output}
                </div>
              )}
            </div>
          ))}

        {/* Live input row (only after boot) */}
        {bootDone && (
          <div className={styles.inputRow}>
            <Prompt />
            <input
              ref={inputRef}
              className={styles.inputField}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="Terminal input"
            />
            <span className={styles.cursor} aria-hidden="true" />
          </div>
        )}
      </div>
    </div>
  );
};

export default FakeTerminal;
