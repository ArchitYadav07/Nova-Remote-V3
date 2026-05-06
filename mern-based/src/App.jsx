import { useState, useEffect, useRef } from 'react';

function App() {
  const [logs, setLogs] = useState([{ message: 'System initialized. Waiting for connection...', type: 'system', time: new Date().toLocaleTimeString() }]);
  const [activeBtn, setActiveBtn] = useState(null);
  const logsEndRef = useRef(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();
      if (['b', 's', '+', '-'].includes(key)) {
        addLog(`Received keystroke: '${key}'`, 'system');
        
        switch(key) {
          case 'b': triggerAction('BUY', 'b'); break;
          case 's': triggerAction('SELL', 's'); break;
          case '+': triggerAction('PLUS', '+'); break;
          case '-': triggerAction('MINUS', '-'); break;
          default: break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addLog = (message, type = 'event') => {
    setLogs(prev => [...prev, { message, type, time: new Date().toLocaleTimeString() }]);
  };

  const triggerAction = (actionName, btnKey) => {
    addLog(`${actionName} action triggered!`, 'event');
    setActiveBtn(btnKey);
    setTimeout(() => setActiveBtn(null), 200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-[#121212] font-sans text-white">
      <div className="bg-[#1e1e1e] max-w-3xl w-full rounded-xl p-8 shadow-2xl">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Novatech Remote Control Dashboard</h1>
          <p className="text-gray-400">Connect your Remote via Bluetooth (Serial) to control the DOM</p>
        </header>

        <section className="bg-white/5 p-5 rounded-xl mb-8 flex justify-between items-center">
          <button disabled className="bg-green-600 opacity-50 cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg">
            Listening for Keyboard Input...
          </button>
          <div className="px-4 py-2 rounded-full text-sm font-bold bg-green-500/20 text-green-500 border border-green-500">
            Ready
          </div>
        </section>

        <section className="bg-white/5 p-5 rounded-xl mb-8">
          <h2 className="text-xl font-semibold mb-4 border-b border-white/10 pb-2">Trading Actions</h2>
          <p className="text-gray-300 mb-4">Press the physical buttons on your remote to trigger these on the website:</p>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => triggerAction('BUY', 'b')}
              className={`p-5 text-2xl font-bold rounded-xl text-white transition-all transform active:scale-95 bg-green-500 hover:bg-green-400 shadow-[0_4px_0_#2e7d32] ${activeBtn === 'b' ? 'brightness-125 scale-95 shadow-none' : ''}`}
            >
              Buy
            </button>
            <button 
              onClick={() => triggerAction('SELL', 's')}
              className={`p-5 text-2xl font-bold rounded-xl text-white transition-all transform active:scale-95 bg-red-500 hover:bg-red-400 shadow-[0_4px_0_#c62828] ${activeBtn === 's' ? 'brightness-125 scale-95 shadow-none' : ''}`}
            >
              Sell
            </button>
            <button 
              onClick={() => triggerAction('PLUS', '+')}
              className={`p-5 text-2xl font-bold rounded-xl text-white transition-all transform active:scale-95 bg-blue-500 hover:bg-blue-400 shadow-[0_4px_0_#1565c0] ${activeBtn === '+' ? 'brightness-125 scale-95 shadow-none' : ''}`}
            >
              +
            </button>
            <button 
              onClick={() => triggerAction('MINUS', '-')}
              className={`p-5 text-2xl font-bold rounded-xl text-white transition-all transform active:scale-95 bg-orange-500 hover:bg-orange-400 shadow-[0_4px_0_#ef6c00] ${activeBtn === '-' ? 'brightness-125 scale-95 shadow-none' : ''}`}
            >
              -
            </button>
          </div>
        </section>

        <section className="bg-white/5 p-5 rounded-xl">
          <h2 className="text-xl font-semibold mb-4 border-b border-white/10 pb-2">Activity Log</h2>
          <div className="bg-black h-40 overflow-y-auto p-4 rounded-xl font-mono text-sm">
            {logs.map((log, idx) => (
              <p key={idx} className={`mb-1 ${log.type === 'system' ? 'text-cyan-400' : 'text-[#8bc34a]'}`}>
                [{log.time}] {log.message}
              </p>
            ))}
            <div ref={logsEndRef} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
