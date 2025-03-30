import { useCallback, useEffect, useRef, useState } from 'react';
import Copy from './assets/copy.png';
import refresh from './assets/regen.png';

function App() {
  const [length, setLength] = useState(6); // Minimum length of password
  const [number, setNumber] = useState(false); // Flag for number usage
  const [char, setChar] = useState(false); // Flag for character usage
  const passwordRef = useRef(null);
  const [password, setPassword] = useState(""); // Stores password
  const [copyMessage, setCopyMessage] = useState(""); // State for copy message
  const [strength, setStrength] = useState(0); // State for password strength

  const copyPassToClip = useCallback(() => {
    // This copies the password to clipboard
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, length);
    window.navigator.clipboard.writeText(password);
    setCopyMessage('Password copied to clipboard!');
    setTimeout(() => setCopyMessage(''), 2000); // Clear message after 2 seconds
  }, [password, length]);

  const passwordgenerator = useCallback(() => {
    // Function to generate random password with alphabets, numbers, and special characters
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (char) str += "!@#$%^&*-_+=";
    for (let i = 1; i <= length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }
    setPassword(pass);
    setStrength(evaluatePasswordStrength(pass));
  }, [length, number, char]);

  const evaluatePasswordStrength = (password) => {
    // Evaluate strength after generating
    let score = 0;
    if (!password) return 0;
    if (password.length >= 8) score += 25; // Length check
    if (/[a-z]/.test(password)) score += 25; // Lowercase check
    if (/[A-Z]/.test(password)) score += 25; // Uppercase check
    if (/\d/.test(password)) score += 25; // Number check
    if (/[^A-Za-z0-9]/.test(password)) score += 25; // Special character check

    return Math.min(score, 100); // Ensure score does not exceed 100
  };

  useEffect(() => {
    // It re-renders when length, number, character, or passwordgenerator() updates
    passwordgenerator();
  }, [length, number, char, passwordgenerator]);

  const reGenerate = useCallback(() => {
    // Call the password generator directly
    passwordgenerator();
  }, [passwordgenerator]);

  return (

    <div className='font-serif w-full max-w-2xl h-screen mx-auto shadow-lg rounded-3xl px-8 py-6 my-4 bg-gray-900'>
      <h1 className='text-white text-center text-4xl font-bold'>Password Generator</h1>
      <h3 className='text-gray-300 text-center text-xl'>Generate strong, unique passwords</h3>
      <div className="rounded-3xl flex flex-col items-center justify-start w-full h-3/5 bg-gray-700 my-10 p-6">
        {copyMessage && (
          <div className="text-green-400 mb-2">{copyMessage}</div>
        )}
        <input
          type='text'
          value={password}
          ref={passwordRef}
          className='rounded-lg outline-none w-full max-w-md py-3 px-4 bg-gray-100 text-black text-center my-5 shadow-md'
          placeholder='Password' Hey
          readOnly
        />
        <div className="flex justify-center w-full my-2">
          <button
            onClick={copyPassToClip}
            className='bg-green-500 hover:bg-green-600 transition duration-300 px-5 py-2 my-1 mx-3 text-white rounded-lg shadow-md'
          >
            Copy <img src={refresh} alt="Copy" className="w-4 h-4 inline-block ml-2" />
          </button>
          <button
            onClick={reGenerate}
            className='bg-blue-500 hover:bg-blue-600 transition duration-300 px-5 py-2 my-1 mx-4 text-white rounded-lg shadow-md'
          >
            Regenerate <img src={Copy} alt="Copy" className="w-4 h-4 inline-block ml-2" />
          </button>
        </div>

        {/* Password Strength Bar */}
        <div className="w-full max-w-md bg-gray-300 rounded-full h-2 my-8">
          <div
            className="h-full rounded-full"
            style={{
              width: `${strength}%`,
              backgroundColor: strength < 50 ? 'red' : strength < 75 ? 'orange' : 'green',
            }}
          />
        </div>
        <p className="text-white">Strength: {strength}%</p>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className="flex items-center">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => { setLength(e.target.value) }}
          />
          <label className='px-1 text-white'>Length: {length}</label>
        </div>

        <div className="flex items-center">
          <label className="flex items-center cursor-pointer  hover:bg-gray-400 hover:rounded-lg">
            <input
              type='checkbox'
              className='mx-1 cursor-pointer'
              checked={number}
              onChange={(e) => {
                setNumber(e.target.checked);
              }}
            />
            <span className='text-white'>Numbers</span>
          </label>
        </div>
        <div className="flex items-center">
          <label className="flex items-center cursor-pointer  hover:bg-gray-400 hover:rounded-lg">
            <input
              type='checkbox'
              className='mx-1 cursor-pointer'
              checked={char}
              onChange={(e) => {
                setChar(e.target.checked);
              }}
            />
            <span className='text-white'>Characters</span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default App;