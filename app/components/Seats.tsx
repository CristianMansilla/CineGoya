import { StopIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

interface SeatsProps {
    onSelectionChange: (selectedSeats: string[]) => void;
}

const Seats = ({ onSelectionChange }: SeatsProps) => {
    const rows = 7;
    const cols = 9;
    const seats = [];

    // Estado local para almacenar los índices de las butacas seleccionadas
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

    
    const handleSeatClick = (row: number, col: number) => {
        // Generar un identificador único para la butaca
        const seatId = `${row}-${col}`;

        // Verificar si la butaca ya está seleccionada
        let updatedSeats: string[];
        if (selectedSeats.includes(seatId)) {
            // Si la butaca ya está seleccionada, quitarla de la lista de seleccionadas
            updatedSeats = selectedSeats.filter(seat => seat !== seatId);
        } else {
            // Si la butaca no está seleccionada, agregarla a la lista de seleccionadas
            updatedSeats = [...selectedSeats, seatId];
        }

        setSelectedSeats(updatedSeats);
        onSelectionChange(updatedSeats);
    };

    for (let i = 1; i <= rows; i++) {
        for (let j = 1; j <= cols; j++) {
            const isSelected = selectedSeats.includes(`${i}-${j}`);

            seats.push(
                <div key={`${i}-${j}`} className="flex justify-center" onClick={() => handleSeatClick(i, j)}>
                    <StopIcon className={`h-12 w-12 ${isSelected ? 'text-green-500' : 'text-yellow-300'}`} />
                </div>
            );
        }
    }

    return <>{seats}</>;
};

export default Seats;
