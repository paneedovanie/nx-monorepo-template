import { Card, Tab, Tabs } from '@mui/material';
import { Store } from '@nx-monorepo-template/global';
import { useState } from 'react';
import { ProductsTable } from './ProductsTable';
import { OrdersTable } from './OrdersTable';
import { PaymentsTable } from './PaymentsTable';
import { CategoriesTable } from '@/core';

export const OtherInformation = ({ store }: { store: Store }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Card>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="Categories" />
        <Tab label="Products" />
        <Tab label="Orders" />
        <Tab label="Payments" />
      </Tabs>

      <div role="tabpanel" hidden={value !== 0}>
        <CategoriesTable {...{ store }} />
      </div>
      <div role="tabpanel" hidden={value !== 1}>
        <ProductsTable {...{ store }} />
      </div>
      <div role="tabpanel" hidden={value !== 2}>
        <OrdersTable {...{ store }} />
      </div>
      <div role="tabpanel" hidden={value !== 3}>
        <PaymentsTable {...{ store }} />
      </div>
    </Card>
  );
};
