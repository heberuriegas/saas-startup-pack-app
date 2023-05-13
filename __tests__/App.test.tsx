import React from 'react';
import App from '../App';
import { renderWithProviders } from '../tests/helpers/render';
import { screen, waitFor } from '../tests/helpers/universal';

describe('<App />', () => {
  beforeEach(async () => {
    await renderWithProviders(<App />, { skipAuthWait: true });
  });

  it('rendered', async () => {
    await waitFor(() => expect(screen.getAllByTestId('app').length).toBe(1));
  });
});
