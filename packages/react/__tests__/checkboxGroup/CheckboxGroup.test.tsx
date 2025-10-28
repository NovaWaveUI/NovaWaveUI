import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { CheckboxGroup } from '../../src/components/checkboxGroup';

describe('CheckboxGroup', () => {
  it('should set aria-labelledby when passed as a prop', () => {
    const { getByRole } = render(
      <CheckboxGroup.Root aria-labelledby="my-label">
        <div>Option</div>
      </CheckboxGroup.Root>
    );
    const group = getByRole('group');
    expect(group).toHaveAttribute('aria-labelledby', 'my-label');
  });

  it('should set aria-label when passed as a prop', () => {
    const { getByRole } = render(
      <CheckboxGroup.Root aria-label="My Label">
        <div>Option</div>
      </CheckboxGroup.Root>
    );
    const group = getByRole('group');
    expect(group).toHaveAttribute('aria-label', 'My Label');
  });

  it('should set aria-labelledby when using an ID from CheckboxGroup.Label', () => {
    const { getByRole, getByText } = render(
      <>
        <CheckboxGroup.Root>
          <CheckboxGroup.Label id="my-label">My Label</CheckboxGroup.Label>
          <div>Option</div>
        </CheckboxGroup.Root>
      </>
    );
    const group = getByRole('group');
    const label = getByText('My Label');
    expect(group).toHaveAttribute('aria-labelledby', label.id);
  });

  it('should have an auto generated ID for CheckboxGroup.Label if no ID is provided', () => {
    const { getByText } = render(
      <>
        <CheckboxGroup.Root>
          <CheckboxGroup.Label>My Label</CheckboxGroup.Label>
          <div>Option</div>
        </CheckboxGroup.Root>
      </>
    );
    const label = getByText('My Label');
    expect(label.id).toBeDefined();
  });

  it('should set aria-describedby when using an ID from CheckboxGroup.Description', () => {
    const { getByRole, getByText } = render(
      <>
        <CheckboxGroup.Root>
          <CheckboxGroup.Label id="my-label">My Label</CheckboxGroup.Label>
          <CheckboxGroup.Description id="my-description">
            My Description
          </CheckboxGroup.Description>
          <div>Option</div>
        </CheckboxGroup.Root>
      </>
    );
    const group = getByRole('group');
    const description = getByText('My Description');
    expect(group).toHaveAttribute('aria-describedby', description.id);
  });

  it('should set aria-describedby to the error message ID from CheckboxGroup.ErrorMessage, when there is an error', () => {
    const { getByRole, getByText } = render(
      <>
        <CheckboxGroup.Root isInvalid>
          <CheckboxGroup.Label id="my-label">My Label</CheckboxGroup.Label>
          <CheckboxGroup.Description id="my-description">
            My Description
          </CheckboxGroup.Description>
          <CheckboxGroup.Error id="my-errormessage">
            My Error Message
          </CheckboxGroup.Error>
          <div>Option</div>
        </CheckboxGroup.Root>
      </>
    );
    const group = getByRole('group');
    const errorMessage = getByText('My Error Message');
    const description = getByText('My Description');
    expect(group).toHaveAttribute(
      'aria-describedby',
      `${description.id} ${errorMessage.id}`
    );
  });

  it('should have an auto generated ID for CheckboxGroup.Description if no ID is provided', () => {
    const { getByRole, getByText } = render(
      <>
        <CheckboxGroup.Root>
          <CheckboxGroup.Label id="my-label">My Label</CheckboxGroup.Label>
          <CheckboxGroup.Description>My Description</CheckboxGroup.Description>
          <div>Option</div>
        </CheckboxGroup.Root>
      </>
    );
    const group = getByRole('group');
    const description = getByText('My Description');
    expect(description.id).toBeDefined();
    expect(group).toHaveAttribute('aria-describedby', description.id);
  });

  it('should not show the error message if isInvalid is not set', () => {
    const { queryByText } = render(
      <>
        <CheckboxGroup.Root>
          <CheckboxGroup.Label id="my-label">My Label</CheckboxGroup.Label>
          <CheckboxGroup.Description id="my-description">
            My Description
          </CheckboxGroup.Description>
          <CheckboxGroup.Error id="my-errormessage">
            My Error Message
          </CheckboxGroup.Error>
          <div>Option</div>
        </CheckboxGroup.Root>
      </>
    );
    const errorMessage = queryByText('My Error Message');
    expect(errorMessage).not.toBeInTheDocument();
  });
});
