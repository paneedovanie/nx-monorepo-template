import {
  Autocomplete,
  AutocompleteProps,
  Box,
  Button,
  Input,
  MenuItem,
  Select,
  SelectProps,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
import { FormikErrors, FormikValues, useFormik } from 'formik';
import { MutationOptions } from 'react-query';
import z from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useSnackbarContext } from '../contexts';
import { ChangeEvent, useEffect } from 'react';
import { Radio, RadioGroup } from '@mui/joy';
import { ApiRouteResponse } from '@ts-rest/core';
import { MuiFileInput } from 'mui-file-input';

interface CustomComponentOptions {
  label?: string;
  name: string;
  props?: any;
  value?: any;
  error?: any;
  labelKey?: string;
  valueKey?: string;
  onChange?: (e: ChangeEvent) => void;
  context?: {
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => Promise<any>;
  };
}

export type FormGeneratorItem = {
  component:
    | `TextField`
    | `AutoComplete`
    | `RadioGroup`
    | `Select`
    | `FileField`
    | ((options: CustomComponentOptions) => JSX.Element);
  label?: string;
  name: string;
  props?: any;
  value?: any;
  error?: any;
  labelKey?: string;
  valueKey?: string;
  onChange?: (e: ChangeEvent) => void;
  context?: {
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => Promise<any>;
  };
};

type FormGeneratorProps<R, I> = {
  initialValues?: I;
  items?: FormGeneratorItem[];
  schema?: z.AnyZodObject | z.ZodEffects<z.AnyZodObject>;
  successMessage: string;
  onCancel?: () => void;
  onChange?: (v: I) => void;
  onSubmit: (
    v: I,
    options: MutationOptions<
      ApiRouteResponse<R>,
      { status: number; body: unknown },
      { body?: I }
    >
  ) => void;
};

type AutoCompleteFieldProps = AutocompleteProps<
  unknown,
  boolean,
  boolean,
  boolean
>;

const FieldProvider = ({
  component,
  label,
  name,
  props,
  value,
  error,
  valueKey = 'value',
  labelKey = 'label',
  onChange,
  context,
}: FormGeneratorItem) => {
  if (typeof component === 'function') {
    return component({
      label,
      name,
      props,
      value,
      error,
      valueKey,
      labelKey,
      onChange,
      context,
    });
  } else if (component === 'FileField') {
    return (
      <MuiFileInput
        label={label}
        name={name}
        value={value}
        placeholder={`Enter ${label}`}
        onChange={(v: File | FileList) => {
          context?.setFieldValue(name, v);
        }}
        size="small"
        error={!!error}
        helperText={error as string}
        {...props}
        type="file"
        sx={{
          width: '100%',
          ...props?.sx,
        }}
      />
    );
  } else if (component === 'Select') {
    const _props = props as SelectProps & {
      options: { [key: string]: any }[];
    };
    return (
      <Select
        value={value}
        label={label}
        name={name}
        onChange={onChange}
        error={error}
        size="small"
        {...props}
      >
        {_props.options.map((item, i) => (
          <MenuItem value={item[valueKey]} key={i}>
            {item[labelKey]}
          </MenuItem>
        ))}
      </Select>
    );
  } else if (component === 'AutoComplete') {
    const _props = props as AutoCompleteFieldProps;
    return (
      <Autocomplete
        defaultValue={props.defaultValue}
        getOptionLabel={(option: { [key: string]: any }) => option[labelKey]}
        onChange={(_: any, v: any) => {
          context?.setFieldValue(name, v[valueKey]);
        }}
        isOptionEqualToValue={(
          option: { [key: string]: any },
          value: { [key: string]: any }
        ) => {
          return option[valueKey] === value[valueKey];
        }}
        renderInput={(params: TextFieldProps) => (
          <TextField
            {...params}
            label={label}
            error={!!error}
            size="small"
            helperText={error as string}
          />
        )}
        {...props}
        options={_props.options}
        sx={{
          width: '100%',
          ...props?.sx,
        }}
      />
    );
  } else if (component === 'RadioGroup') {
    return (
      <Box {...props}>
        <Typography variant="body2">{label}</Typography>
        <RadioGroup value={value} name={name}>
          {props.options.map(
            ({ value, label }: { value: string; label: string }) => (
              <Radio value={value} label={label} variant="outlined" />
            )
          )}
        </RadioGroup>
      </Box>
    );
  } else {
    return (
      <TextField
        label={label}
        name={name}
        value={value}
        placeholder={`Enter ${label}`}
        onChange={onChange}
        size="small"
        error={!!error}
        helperText={error as string}
        {...props}
        sx={{
          width: '100%',
          ...props?.sx,
        }}
      />
    );
  }
};

export const FormGenerator = <R, I extends FormikValues = any>({
  initialValues,
  schema,
  items,
  successMessage,
  onCancel,
  onChange,
  onSubmit,
}: FormGeneratorProps<R, I>) => {
  const { setAlertSnackbar } = useSnackbarContext();

  const {
    values,
    errors,
    isValid,
    isSubmitting,
    dirty,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldValue,
  } = useFormik<I>({
    initialValues: initialValues ?? ({} as I),
    validationSchema: schema && toFormikValidationSchema(schema),
    onSubmit: async (v, { resetForm }) => {
      await new Promise((res) =>
        onSubmit(v, {
          onSuccess: (v) => {
            resetForm();
            setAlertSnackbar({
              content: <span>{successMessage}</span>,
            });
          },
          onError: (v) => {
            setAlertSnackbar({
              severity: 'error',
              content: <span>{(v?.body as Error).message}</span>,
            });
          },
          onSettled: () => {
            res(undefined);
          },
        })
      );
    },
  });

  console.log('Form Values:', values);
  console.log('Form Errors:', errors);

  useEffect(() => {
    onChange?.(values);
  }, [values, onChange]);

  return (
    <form onSubmit={handleSubmit}>
      <fieldset style={{ border: 0, padding: 0 }} disabled={isSubmitting}>
        {items?.map((item, i) => {
          const key = item.name as keyof FormikErrors<I>;
          return (
            <Box sx={{ my: 1 }} key={i}>
              <FieldProvider
                {...item}
                value={values[key]}
                onChange={handleChange}
                error={errors[key]}
                context={{ setFieldValue }}
              />
            </Box>
          );
        })}
        <Box sx={{ mb: 1, display: 'flex', gap: 1 }}>
          <>
            <Button
              type="submit"
              variant="contained"
              disabled={!dirty || !isValid || isSubmitting}
            >
              Submit
            </Button>
            {onCancel ? (
              <Button
                variant="outlined"
                onClick={() => {
                  resetForm();
                  onCancel?.();
                }}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            ) : null}
          </>
        </Box>
      </fieldset>
    </form>
  );
};
