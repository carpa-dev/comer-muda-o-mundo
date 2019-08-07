import { Navbar } from '@components/index';
import { Container } from '@material-ui/core';

function ProducerIndex() {
  return (
    <>
      <Navbar admin />

      <Container>
        <h1>There should be a list of producers</h1>
      </Container>
    </>
  );
}

export default ProducerIndex;
