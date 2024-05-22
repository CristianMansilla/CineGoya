import { StopIcon } from "@heroicons/react/24/solid";
import { useState } from "react";


const Seats = () => {
    const rows = 7;
    const cols = 9;
    const seats = [];

    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

    const handleSeatClick = (row:number, col:number) => {
        // Generar un identificador único para la butaca
        const seatId = `${row}-${col}`;

        // Verificar si la butaca ya está seleccionada
        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
        } else {
            setSelectedSeats([...selectedSeats, seatId]);
        }
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

    return seats;
};

export default Seats;
