import { Button, Col, Row, Typography } from 'antd';
import React from 'react';

function CartItem({ item }) {

  
  return (
    <Row
      className="p-3 border-green-300 border-solid "
     >
      <Col sm={24} md={8} lg={8}>
        <img
         className='block w-[100px]'
          src={item.productId.img}
          alt='item'
        />
      </Col>
      <Col sm={24} md={8} lg={8}>
        <Typography.Title level={3}>{item.productId.name}</Typography.Title>
      </Col>
      <Col sm={24} md={8} lg={8}>
        <div className="text-right font-bold">{item.productId.price} vnd</div>
      </Col>
      <Button type='primary' onClick={() => alert(' Mua hang thanh cong')}>
        {' '}
        Mua hang
      </Button>
      <Button type='danger'>
        Delete
      </Button>
    </Row>
  );
}

export default CartItem;
