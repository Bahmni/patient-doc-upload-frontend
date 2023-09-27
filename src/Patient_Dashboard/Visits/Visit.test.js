import React from 'react';
import { render } from '@testing-library/react';
import Visit from './Visit';

jest.mock('./VisitDate', () => {
  return function MockVisitDate(props) {
    return <div data-testid="mock-visit-date">{props.datetime}</div>;
  };
});

describe('Visit Component', () => {
  it('renders the Visit component with correct visit details', () => {
    const visit = {
      startDatetime: '2023-09-28T10:00:00',
    };

    const { getByText, getByTestId } = render(<Visit visit={visit} />);

    const visitDescription = getByText('Visit');
    expect(visitDescription).toBeInTheDocument();

    const visitDate = getByTestId('mock-visit-date');
    expect(visitDate).toHaveTextContent('2023-09-28T10:00:00');
  });

  it('renders the Visit component with empty datetime', () => {
    const visit = {
      startDatetime: '',
    };

    const { getByText, queryByTestId } = render(<Visit visit={visit} />);

    const visitDescription = getByText('Visit');
    expect(visitDescription).toBeInTheDocument();

    const visitDate = queryByTestId('mock-visit-date');
    expect(visitDate).toBeNull();

  });
});
