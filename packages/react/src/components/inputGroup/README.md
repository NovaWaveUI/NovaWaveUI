# Input Group Component

The Input Group component is a versatile UI element that allows you to extend the functionality of standard input fields by combining them with additional elements such as buttons, icons, or text.

Each Input Group is composed of the following slots:

- `StartContent`: This slot is used to add content before the input field, such as an icon or a button.
- `Input`: This slot is for the main input field where users can enter data.
- `EndContent`: This slot is used to add content after the input field, such as a button or additional text.

## Usage Example

```jsx
import React from 'react';
import { InputGroup, Input, Button } from 'your-ui-library';

const MyInputGroup = () => (
  <InputGroup>
    <InputGroup.StartContent>
      <Button>Start</Button>
    </InputGroup.StartContent>
    <Input placeholder="Enter text here" />
    <InputGroup.EndContent>
      <Button>End</Button>
    </InputGroup.EndContent>
  </InputGroup>
);
```
