import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { CheckboxGroup } from '../../src/components/checkboxGroup';

describe('CheckboxGroup', () => {
  it('should set aria-labelledby when passed as a prop', () => {
    const { getByRole } = render(
      <CheckboxGroup aria-labelledby="my-label">
        <div>Option</div>
      </CheckboxGroup>
    );
    const group = getByRole('group');
    expect(group).toHaveAttribute('aria-labelledby', 'my-label');
  });

  it('should set aria-labelledby when using an ID from CheckboxGroup.Label', () => {
    const { getByRole, getByText } = render(
      <>
        <CheckboxGroup>
          <CheckboxGroup.Label id="my-label">My Label</CheckboxGroup.Label>
          <div>Option</div>
        </CheckboxGroup>
      </>
    );
    const group = getByRole('group');
    const label = getByText('My Label');
    console.log(label);
    expect(label).toHaveAttribute('id');
    expect(group).toHaveAttribute('aria-labelledby', label.id);
  });
});
