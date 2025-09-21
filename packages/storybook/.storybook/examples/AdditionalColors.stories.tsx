import { Meta, StoryObj } from '@storybook/react-vite';
import Button from '@novawaveui/react/button';

const meta: Meta<typeof Button> = {
  title: 'Examples/Additional Colors',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        story:
          'This example showcases buttons with additional colors defined in a custom theme. The colors include "brand-primary", "brand-secondary", and "ocean". Each button demonstrates a different color option, allowing you to see how the buttons look with these custom colors. You can apply this to variants, radius, and sizes',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const AdditionalColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button color="brand-primary" variant="solid">
        Brand Primary
      </Button>
      <Button color="brand-secondary" variant="solid">
        Brand Secondary
      </Button>
      <Button color="ocean" variant="solid">
        Ocean
      </Button>
    </div>
  ),
};
