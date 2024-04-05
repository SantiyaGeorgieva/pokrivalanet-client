import React from 'react';
import { Alert } from 'reactstrap';

function Message({ text, isVisible, onDismiss, error }) {
  return (
    <Alert
      color={`${error ? 'danger' : 'success'}`}
      isOpen={isVisible}
      toggle={onDismiss}
      className="mt-3"
      fade
      transition={{ timeout: 500 }}
    >
      {text}
    </Alert>
  );
}

export default Message;
