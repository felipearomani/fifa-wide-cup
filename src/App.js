import React, { useState } from 'react';
import { 
  Container,
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  ListGroup,
  ListGroupItem,
  Alert,
  Table
} from 'reactstrap';


function App() {

  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState([]);
  const [doubles, setDoubles] = useState([]);
  const [error, setError] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    
    const hasPlayer = players.filter((p) => p === playerName)

    if (hasPlayer.length > 0) {
      setError(`Jogador ${playerName} já existe!`)
      setPlayerName("");
      return;
    } else {
      setError("");
    }

    if (playerName) {
      players.push(playerName)
      setPlayerName("");
      setPlayers(players);
    }
  }

  const deletePlayer = (id) => {
    const newPlayers = players.filter((p, i) => i !== id);
    setPlayers(newPlayers);
  }

  const deleteDouble = (id) => {
    const double = doubles[id];
    players.push(double.p1)
    players.push(double.p2)

    const newDoubles = doubles.filter((d, i) => i !== id);

    setPlayers([...players]);
    setDoubles([...newDoubles]);
  }

  const detelePlayerByName = (players, name) => players.filter(p => p !== name);

  const doublesCreate = () => {
    
    if (players.length === 0) {
      setError("Não existem jogadores sem dupla");
      return;
    }

    if (players.length % 2 !== 0) {
      setError("Número impar de jogadores, precisa ser par para separar as duplas");
      return;
    }
    
    setError("");
    
    const p1 = players[Math.floor(Math.random()*players.length)]
    let newPlayers = detelePlayerByName(players, p1)

    const p2 = newPlayers[Math.floor(Math.random()*newPlayers.length)]
    newPlayers = detelePlayerByName(newPlayers, p2)

    const double = {p1,p2};
    doubles.push(double);
    setDoubles([...doubles]);
    setPlayers([...newPlayers]);
  }

  return (
    <Container>
      <Row style={{marginTop: "2em"}}>
        <Col>
          <h1 style={{textAlign: "center"}}>Fifa Wide Cup</h1>
        </Col>
      </Row>  
      
      <Row>
        <Col md="12">
          <Form onSubmit={onSubmit}>
            <FormGroup>  
              <Label for="player">Adicionar jogador</Label>
              <Input 
                type="text"
                name="player"
                id="player"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)} 
              />
            </FormGroup>
            <Button size="sm" type="submit" color="primary">Adicionar</Button>
          </Form>
        </Col>
      </Row>

      <Row style={{marginTop:"1em"}}>
        <Col md="12">
          <ListGroup flush>
            {error ? <Alert color="danger">{error}</Alert> : ""}
          </ListGroup>
        </Col>
      </Row>
      
      <Row>
        <Col md="12">
          <hr />
          <h3>Jogadores sem dupla</h3>
          <ListGroup>
            {players.length === 0 ? <p>Nenhum Jogador</p>: <p>{players.length} jogadores</p>}
            {players.map((p, index) => <ListGroupItem key={index}>{p} <Button close onClick={() => deletePlayer(index)} /></ListGroupItem>)}
          </ListGroup>
        </Col>
      </Row>

      <Row>
        <Col md="12">
          <hr />
          <h3>Duplas</h3>
          <Table striped bordered size="sm">
            <tbody>
              {doubles.map((d,i) => {
                return (
                  <tr key={i} style={{textAlign: "center"}}>
                    <td>{d.p1}</td>
                    <td>{d.p2}</td>
                    <td style={{width: "1em"}}><Button close onClick={() => deleteDouble(i)} /></td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
          <Button color="warning" size="sm" onClick={doublesCreate}>Criar dupla</Button>
        </Col>
      </Row>
    
    </Container>
  );
}

export default App;
