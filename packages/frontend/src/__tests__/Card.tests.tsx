import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react';
import Card from '../ui/atoms/Card';

describe('Card', () => {
    it('renders without crashing', () => {
        const { getByText } = render(<Card imageUrl="" title="Test Card" description="Test Description" />);
        expect(getByText('Test Card')).toBeInTheDocument();
        expect(getByText('Test Description')).toBeInTheDocument();
    });

    it('calls onClickLike when the like button is clicked', async () => {
        const onClickLike = jest.fn();
        const { getByTestId } = render(<Card imageUrl="" title="Test Card" description="Test Description" onClickLike={onClickLike} />);
        fireEvent.click(getByTestId('empty-heart-icon'));
        expect(onClickLike).toHaveBeenCalled();
    });

    it('calls onClickCard when the card is clicked', () => {
        const onClickCard = jest.fn();
        const { getByText } = render(<Card imageUrl="" title="Test Card" description="Test Description" onClickCard={onClickCard} />);
        fireEvent.click(getByText('Test Card'));
        expect(onClickCard).toHaveBeenCalled();
    });

    it('if canEdit is true, shows delete Icon', () => {
        const onDelete = jest.fn();
        const { getByTestId } = render(<Card imageUrl="" title="Test Card" description="Test Description" canEdit={true} onDelete={onDelete} />);
        expect(getByTestId('delete-icon')).toBeInTheDocument();
        fireEvent.click(getByTestId('delete-icon'));
        expect(onDelete).toHaveBeenCalled();
    });
});