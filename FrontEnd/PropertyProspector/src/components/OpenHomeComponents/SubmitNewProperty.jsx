import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { apiPropertyPost } from './apiPropertyPost';
import { Form, Col } from 'react-bootstrap';

export function SubmitNewProperty() {
  const [propertyAddress, setAddress] = useState('');
  const [propertyImage, setImage] = useState('');
  const [smShow, setSmShow] = useState(false);
  const [error, setError] = useState('');

  const addProperty = () => {
    // Reset error state before making the API call
    setError('');

    apiPropertyPost(propertyAddress, propertyImage)
      .then((response) => {
        console.log(response.data);
        // Handle success
      })
      .catch((error) => {
        console.error("Error adding property:", error);
        // Set error state for displaying the error message
        setError("Error adding property. Please try again.");
      });
  };

  // Function to add Property to the database and close the modal after submitting
  const onClickFunc = () => {
    addProperty();
    setSmShow(false);
  };

  return (
    <>
      <Col className='addPropertyCard' onClick={() => setSmShow(true)}>
        <Card style={{ width: '18rem', color: '#656762', borderColor: '#656762' }}>
          <Card.Body>
            <Card.Title>Add new property</Card.Title>
            <Card.Text>
              <img src={'./src/assets/add.svg'} alt="Add Property" />
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            <Form.Control
              type="text"
              value={propertyAddress}
              placeholder="Enter property address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Control
              type="text"
              placeholder="Add image URL"
              value={propertyImage}
              onChange={(e) => setImage(e.target.value)}
            />
        </Modal.Body>
        <Modal.Footer>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Button variant="primary" onClick={onClickFunc}>
            Add Property
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}