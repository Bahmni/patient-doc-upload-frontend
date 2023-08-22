import React from 'react';
import { render } from '@testing-library/react';
import DashboardLayout from './DashboardLayout';

test('renders children inside the layout', () => {
  const children = <div>Child Component</div>;

  const { getByText } = render(<DashboardLayout>{children}</DashboardLayout>);

  expect(getByText('Child Component')).toBeInTheDocument();
});
