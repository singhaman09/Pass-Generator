import { useCallback, useEffect, useRef, useState } from 'react';
import Copy from './assets/copy.png'
import refresh from './assets/regen.png'
function App() {
  const [length, setLength] = useState(6); //minimum length of password
  const [number, setNumber] = useState(false); //flag for number usuage
  const [char, setChar] = useState(false); //flag for char usuage
  const passwordRef = useRef(null);
  const [password, setPassword] = useState(""); //stores password
  const [copyMessage, setCopyMessage] = useState(""); // State for copy message
  const [strength, setStrength] = useState(0); // State for password strength

  const copyPassToClip = useCallback(() => {
    //this does copy password to clipboard
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, length);
    window.navigator.clipboard.writeText(password);
    setCopyMessage('Password copied to clipboard!');
    setTimeout()
  }, [password, length]);

  const passwordgenerator = useCallback(() => {
    // Function to generate random password with alphabets, number, special characters
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (char) str += "!@#$%^&*-_+=";
    for (let i = 1; i <= length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);}
    setPassword(pass);
    setStrength(evaluatePasswordStrength(pass));
  }, [length, number, char]);

  const evaluatePasswordStrength = (password) => {
    // Evaluate strength after generating
    let score = 0;
    if (!password) return 0;
    if (password.length > 8) score += 25;
    if (/[a-z]/.test(password)) score += 25;
    if (/[A-Z]/.test(password)) score += 25; 
    if (/\d/.test(password)) score += 25;
    if (/[^A-Za-z0-9]/.test(password)) score += 25;

    return score; // Return score out of 100
  };

  useEffect(() => {
    //it re-renders when lenght , number, character or passwordgenerator() updates
    Copy
    passwordgenerator();
  }, [length, number, char, passwordgenerator]);

  const reGenerate = useCallback(() => {
    // Call the password generator directly
    passwordgenerator(); 
  }, [passwordgenerator]);

  return (
    <>
      <div className='font-serif w-full max-w-10/12 h-screen mx-auto shadow-md rounded-4xl px-7 py-6 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center text-4xl text-italic'>Password Generator</h1>
        <h3 className='text-white text-center text-xl'>Generate strong, unique passwords</h3>
        <div className="rounded-4xl flex flex-col items-center justify-start w-full h-6/12 bg-gray-600 my-10">
          <div className="flex flex-col items-center justify-start w-full"> 
            {/* it displayed the copied message. */}
            {copyMessage && (
              <div className="text-white mb-2">{copyMessage}</div>
            )}
            <input
              type='text'
              value={password}
              ref={passwordRef}
              className='rounded-2xl outline-none w-full max-w-md py-2 px-12 bg-gray-100 text-black text-center my-5'
              placeholder='Password'
              readOnly
            />
            <div className="flex justify-center w-full my-2">
              <button
                onClick={copyPassToClip}
                className='bg-white px-5 py-1 my-1 mx-3 text-black hover:bg-gray-300 rounded-2xl'
              >
              Copy<img src={refresh} alt="Copy" className="w-4 h-4 mr-2" />
              </button>
              <button
                onClick={reGenerate}
                className='bg-white px-5 py-1 my-1 mx-4 text-black hover:bg-gray-300 rounded-2xl'
              >
              Regenerate  <img src={Copy} alt="Copy" className="w-4 h-4" />
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
        </div>
        <div className='flex text-sm gap-x-2'>
          <div>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label className='px-1'>Length: {length}</label>

            <input
              type='checkbox'
              className='mx-1'
              checked={number}
              onChange={(e) => {
                setNumber(e.target.checked);
              }}
            />
            <label>Numbers</label>
            <input
              type='checkbox'
              className='mx-1'
              checked={char}
              onChange={(e) => {
                setChar(e.target.checked);
              }}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;