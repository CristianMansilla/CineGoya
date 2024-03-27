import { CurrencyDollarIcon } from '@heroicons/react/24/solid';
import PochocloGaseosaImage from '../assets/pochoclo_gaseosa.jpg'; // Importa la imagen de pochoclo y gaseosa
import TarjetaDebitoImage from '../assets/tarjeta_debito.jpg'; // Importa la imagen de tarjetas de débito

const Precios = () => {
    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Precios</h1>
            <table className="min-w-full divide-y divide-gray-200 mb-8">
                <thead className="bg-blue-100">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Día
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Precio
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap">Lunes a Jueves</td>
                        <td className="px-6 py-4 whitespace-nowrap">$2800</td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap">Viernes a Domingo</td>
                        <td className="px-6 py-4 whitespace-nowrap">$4000</td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap">Lunes a Lunes - Comprando por la web</td>
                        <td className="px-6 py-4 whitespace-nowrap">$2500</td>
                    </tr>
                </tbody>
            </table>

            <div>
                <h2 className="text-xl font-semibold mb-2">Oferta de la semana</h2>
                <div className="grid grid-cols-2 gap-8">
                    <div className="bg-orange-100 p-6 rounded-lg flex flex-col justify-center items-center">
                        {/* <img src="" alt="Pochoclo y Gaseosa" className="w-24 h-24 mb-4" /> */}
                        <p className="text-gray-700">2 Entradas + 2 Pochoclos + 2 Gaseosas</p>
                        <h3 className="text-gray-800">$10000</h3>
                    </div>
                    <div className="bg-orange-100 p-6 rounded-lg flex flex-col justify-center items-center">
                        {/* <img src="/logo-cinegoya.png" alt="Tarjetas de Débito" className="w-24 h-24 mb-4" /> */}
                        <p className="text-gray-700">2 Entradas - débito (BanCo, MP, Santander)</p>
                        <h3 className="text-gray-800">$5000</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Precios;