import meme from './meme.png';
import './App.css';
import { Button, Image, Form, FormGroup } from 'react-bootstrap';
import { Container } from './drag/Container';





function App() {
  return (

    <div tabIndex={1} className="App App-header">

      <h1 className="mt-2">Virgin vs Chad Meme Maker</h1>
      <div className="mt-2">Double click to create a new box, left click it to edit it, drag it to movie it, and right click it to delete it.</div>

      <div style={{ height: "90vh", width: "100%", backgroundImage: `url(${meme})`, backgroundRepeat: "no-repeat", backgroundSize: "90%", backgroundPosition: "center" }}>


        <Container className="w-100 h-100" hideSourceOnDrag={true}>
        </Container>

      </div>


    </div >
  );
}

export default App;
