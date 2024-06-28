// src/components/AddEvent.jsx
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddEvent = ({
  show,
  handleClose,
  handleSave,
  newEvent,
  handleInputChange,
  handleDelete,
  isEditing
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
      <Modal.Title>{isEditing ? 'Edit Event' : 'Add Event'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formEventName">
            <Form.Label>Event Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter event name"
              name="name"
              value={newEvent.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formEventType">
            <Form.Label>Event Type</Form.Label>
            <Form.Control
              as="select"
              name="type"
              value={newEvent.type}
              onChange={handleInputChange}
            >
              <option>Birthday</option>
              <option>Meeting</option>
              <option>Reminder</option>
              <option>Task</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formEventDescription">
            <Form.Label>Event Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter event description"
              name="description"
              value={newEvent.description}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {isEditing && (
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        )}
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEvent;
