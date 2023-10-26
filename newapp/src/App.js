import React, { useEffect, useState } from 'react';

function App() {
  const [Text, setText] = useState('');
  const [he, setHe] = useState([]); // Use state for suggestions

  useEffect(() => {
    const postData = async () => {
      try {
        const apiUrl = `https://api.textgears.com/grammar?text=${Text}&language=en-GB&whitelist=&dictionary_id=&ai=1&key=ScsCsQ9MgjQvx7J3`;
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: Text }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Data posted successfully:', result);
        const suggestions = result.response.errors.map((error) => error.better).flat();
        setHe(suggestions);
       
      } catch (error) {
        console.error('Error posting data:', error);
      }
    };
    if (Text) {
      postData();
    }
  }, [Text]);

  return (
    <div className="App">
      <h1>Spell Check</h1>
      <textarea
        style={{ width: '400px', height: '400px', display: "block" }}
        onChange={(e) => setText(e.target.value)}
      />
      <div>
        <h2>Suggestions:</h2>
        <ul>
          {he.map((suggestion, index) => (
            <>
            <li key={index}>{suggestion}</li>
            </>
            
          ))}
        </ul>
      </div>
      <button onClick={() => setText(Text)}>Check Text</button>
    </div>
  );
}

export default App;
