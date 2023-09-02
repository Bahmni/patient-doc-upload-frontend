// import React from 'react';
// import { render } from '@testing-library/react';
// import DashboardLayout from './DashboardLayout';

// test('renders children inside the layout', () => {
//   const children = <div>Child Component</div>;

//   const { getByText } = render(<DashboardLayout>{children}</DashboardLayout>);

//   expect(getByText('Child Component')).toBeInTheDocument();
// });
import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import DashboardLayout from '../Patient_Dashboard/DashboardLayout';

test('renders DashboardLayout component', () => {
  const { container } = render(
    <BrowserRouter>
      <DashboardLayout />
    </BrowserRouter>
  );
  const dashboardContainer = container.querySelector('.dashboard-container');
  expect(dashboardContainer).toBeInTheDocument();
});

