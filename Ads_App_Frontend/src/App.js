import './App.css';
import View from './Components/View';
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <View />
      </BrowserRouter>
    </div>
  );
}

export default App;
