import { useSelector } from 'react-redux';
import { List, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { OrderItem } from './OrderItem';
import { Filter } from './Filter';

const Orders = () => {
  const [filter, setFilter] = useState();
  const { orders } = useSelector(state => state.orders);
  const [ordersList, setOrdersList] = useState(orders);

  useEffect(() => {
    setOrdersList(orders);

    if (!filter) return;
    setOrdersList(orders.filter(item => item.orderStatus === filter));
  }, [setOrdersList, orders, filter]);

  return (
    <Stack maxW="512px" margin="auto" mt={5}>
      <Filter onChange={event => setFilter(+event.target.value)} />
      <List>
        {ordersList.map(order => (
          <OrderItem
            id={order.id}
            key={order.id}
            total={order.total}
            date={order.orderDate}
            fee={order.deliveryFee}
            status={order.orderStatus}
            number={order.orderNumber}
          />
        ))}
      </List>
    </Stack>
  );
};

export default Orders;
