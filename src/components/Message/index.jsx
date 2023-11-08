import React from 'react';
import { Alert } from 'reactstrap';

function Message({ text, isVisible, onDismiss }) {
  return (
    <Alert
      isOpen={isVisible}
      toggle={onDismiss}
      className="mt-3"
      fade
      transition={{ timeout: 1000 }}
    >
      {text}
    </Alert>
  );
}

export default Message;
