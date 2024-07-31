import type { Meta, StoryObj } from '@storybook/vue3';
import { userEvent, within, expect } from '@storybook/test';

import Login from './Login.vue';

const meta: Meta<typeof Login> = {
  component: Login,
  
};

export default meta;
type Story = StoryObj<typeof Login>;

export const Empty: Story = {
  args: {
    loading: false,
  },
  play: async ({ canvas }) => {
    const collection = canvas.getAllByText(/Login/i);
    await userEvent.click(collection[1]);
    
    expect(canvas.getAllByText(/Field is required/i)).toHaveLength(2);
  }
};

export const Filled: Story = {
  play: async ({ canvas }) => {
  

    const emailInput = canvas.getByLabelText(/Email or Nickname/i);
    await userEvent.type(emailInput, 'John Doe');
    
    const passwordInput = canvas.getByLabelText(/Password/i);
    await userEvent.type(passwordInput, 'always_use_strong_passwords');
    
    await userEvent.click(canvas.getByText(/Remember me/i));

    
    const collection = canvas.getAllByText(/Login/i);
    await userEvent.click(collection[1]);
        
  }
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};


export const Error: Story = {
  args: {
    loading: false,
    errorMessage: 'Invalid username or password',
  },
};


