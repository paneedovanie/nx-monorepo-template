import { FormGenerator, FormGeneratorItem, useTsQueryClient } from '@/core';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Tag, CreateTag, UpdateTag } from '@nx-monorepo-template/global';
import { CreateTagSchema, UpdateTagSchema } from '@nx-monorepo-template/global';

export const TagDialog = ({
  data,
  open,
  onClose,
  onSuccess,
}: {
  data?: Tag;
  open: boolean;
  onClose: () => void;
  onSuccess?: (data: Tag) => void;
}) => {
  const tsQueryClient = useTsQueryClient();
  const { mutate: create } = tsQueryClient.tag.create.useMutation({
    onSuccess: (v) => {
      onSuccess?.(v.body);
    },
  });
  const { mutate: update } = tsQueryClient.tag.update.useMutation({
    onSuccess: (v) => {
      onSuccess?.(v.body);
    },
  });

  const initialValues = {
    title: data?.title ?? '',
    type: data?.type ?? 'product',
  };

  const items: FormGeneratorItem[] = [
    {
      label: 'Title',
      name: 'title',
      component: 'TextField',
    },
  ];

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{data?.id ? 'Update' : 'Create'} Tag</DialogTitle>
      <DialogContent>
        {data?.id ? (
          <FormGenerator<Tag, UpdateTag>
            initialValues={initialValues}
            schema={UpdateTagSchema}
            successMessage={'Tag updated'}
            onSubmit={(v, options) => {
              update(
                {
                  params: { id: data.id },
                  body: v,
                },
                options
              );
            }}
            items={items}
          />
        ) : (
          <FormGenerator<Tag, CreateTag>
            initialValues={initialValues}
            schema={CreateTagSchema}
            successMessage={'Tag created'}
            onSubmit={(v, options) => {
              create(
                {
                  body: v,
                },
                options
              );
            }}
            items={items}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
