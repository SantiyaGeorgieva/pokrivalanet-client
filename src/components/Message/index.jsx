import React, { useState } from 'react';
import { Alert } from 'reactstrap';

function Message({ text, isVisible }) {
  const [visible, setVisible] = useState(isVisible);
  const onDismiss = () => setVisible(false);

  return (
    <Alert isOpen={visible} toggle={onDismiss} className="mt-3">
      {text}
    </Alert>
  );
}

export default Message;
