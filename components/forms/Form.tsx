import { ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { cn } from '@/lib/utils';

interface FormProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  children: ReactNode;
  className?: string;
}

export function Form({ form, onSubmit, children, className }: FormProps) {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-6', className)}>
      {children}
    </form>
  );
}

interface FormFieldProps {
  name: string;
  label?: string;
  error?: string;
  children: ReactNode;
}

export function FormField({ name, label, error, children }: FormFieldProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      {children}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

interface FormSectionProps {
  title?: string;
  description?: string;
  children: ReactNode;
}

export function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <div className="space-y-4">
      {(title || description) && (
        <div>
          {title && <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>}
          {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
        </div>
      )}
      <div className="space-y-4">{children}</div>
    </div>
  );
}

interface FormActionsProps {
  children: ReactNode;
}

export function FormActions({ children }: FormActionsProps) {
  return (
    <div className="flex items-center justify-end space-x-3">
      {children}
    </div>
  );
}
