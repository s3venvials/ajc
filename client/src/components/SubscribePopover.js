import React from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap';

const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Subscribe to our email list!</Popover.Title>
      <Popover.Content>
        Subscribe to be notified about our latest reads! We will not spam or sell your email!
      </Popover.Content>
    </Popover>
  );
  
  const SubscribePopover = () => (
    <OverlayTrigger placement="top" overlay={popover}>
      <i className="fas fa-info-circle"></i>
    </OverlayTrigger>
  );


export default SubscribePopover;