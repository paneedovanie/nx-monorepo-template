import { FormGenerator, useTsQueryClient } from '@/core';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Order, OrderStatus, UpdateOrder } from '@nx-monorepo-template/global';
import { UpdateOrderSchema } from '@nx-monorepo-template/global';

const statusOptions = Object.values(OrderStatus).map((status) => ({
  label: status.charAt(0).toUpperCase() + status.substring(1),
  value: status,
}));

export const StatusDialog = ({
  data,
  open,
  onClose,
  onSuccess,
}: {
  data: Order;
  open: boolean;
  onClose: () => void;
  onSuccess?: (data: Order) => void;
}) => {
  const tsQueryClient = useTsQueryClient();
  const { mutate } = tsQueryClient.order.update.useMutation({
    onSuccess: (v) => {
      onSuccess?.(v.body);
    },
  });
  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: ['100%', null, 320] } }}
    >
      <DialogTitle>Change Status</DialogTitle>
      <DialogContent>
        <FormGenerator<Order, UpdateOrder>
          initialValues={{
            status: data.status,
            user: data.user?.id,
            store: data.store.id,
            items: data.items,
          }}
          schema={UpdateOrderSchema}
          successMessage={'Order updated'}
          onSubmit={(v, options) => {
            mutate({ params: { id: data.id }, body: v }, options);
          }}
          items={[
            {
              name: 'status',
              component: 'Select',
              label: 'Status',
              props: {
                options: statusOptions,
              },
            },
          ]}
        />
      </DialogContent>
    </Dialog>
  );
};
