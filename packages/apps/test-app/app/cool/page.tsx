'use client';

import { Button, Checkbox, CheckboxGroup } from '@novawaveui/react';
import Link from 'next/link';

export default function CoolPage() {
  return (
    <div className="">
      <h1 className="text-4xl font-bold text-center">Cool Page</h1>
      <p className="text-center mt-4">This is a cool page!</p>
      <Button color="primary" isLoading asChild>
        <Link href="/">Go Back Home</Link>
      </Button>
      <Button>Normal Button</Button>
      <CheckboxGroup orientation="vertical" color="primary" isRequired>
        <CheckboxGroup.Label>Choose your player:</CheckboxGroup.Label>
        <Checkbox value="frontend">
          <Checkbox.Indicator>
            <Checkbox.Icon />
          </Checkbox.Indicator>
          <Checkbox.Label>Frontend Developer</Checkbox.Label>
        </Checkbox>
        <Checkbox value="backend">
          <Checkbox.Indicator>
            <Checkbox.Icon />
          </Checkbox.Indicator>
          <Checkbox.Label>Backend Developer</Checkbox.Label>
        </Checkbox>
        <Checkbox value="vibe">
          <Checkbox.Indicator>
            <Checkbox.Icon />
          </Checkbox.Indicator>
          <Checkbox.Label>Vibe Developer</Checkbox.Label>
        </Checkbox>
        <Checkbox value="fun">
          <Checkbox.Indicator>
            <Checkbox.Icon />
          </Checkbox.Indicator>
          <Checkbox.Label>I'm just here for fun</Checkbox.Label>
        </Checkbox>
        <CheckboxGroup.Description>
          You can select multiple options. Have fun!
        </CheckboxGroup.Description>
      </CheckboxGroup>
    </div>
  );
}
