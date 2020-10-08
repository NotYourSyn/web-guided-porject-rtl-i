import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import AnimalForm from './AnimalForm';

test('renders AnimalForm without errors', () => {
    render(<AnimalForm/>);
  });

  test('user can fill out and submit the form', async () => {
      //render the component
      render(<AnimalForm/>);

      // query the virtualDOM for each input field, so we can work w them 
        const speciesInput = screen.getByLabelText(/species/i);
        const ageInput = screen.getByLabelText(/age/i);
        const notesInput = screen.getByLabelText(/notes/i);

      // fill out the form
        fireEvent.change(speciesInput, {target: {value: 'Grizzly Bear'}});
        fireEvent.change(ageInput, {target: {value: 98}});
        fireEvent.change(notesInput, {target: {value: 'hates Goldilocks'}});

      // sanity check: assert that the form inputs contain the values we typed in
        expect(speciesInput).toHaveValue('Grizzly Bear');
        expect(ageInput).toHaveValue('98');
        expect(notesInput).toHaveValue('hates Goldilocks');

      // Submit the form (Carefull --state changes can happen asynchronously)
        const button = screen.getByRole('button', {name:/submit/i});
        fireEvent.click(button);

      // assert that the animal was added to the list 
        const newAnimal = await screen.findByText(/grizzly bear/i);
        expect(newAnimal).not.toHaveStyle({display:'none'});
  })