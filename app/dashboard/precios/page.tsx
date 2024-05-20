const Precios = () => {
    return (
        <>
            <title>Precios - CineGoya</title>

            <div className="container mx-auto preciosContainer">
                <h1 className="text-2xl font-bold mb-4">Precios</h1>

                {/* Tabla solo visible en dispositivos grandes */}
                <table className="min-w-full divide-y divide-gray-200 mb-8 hidden md:table">
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

                {/* Tabla en forma de lista para dispositivos pequeños */}
                <div className="md:hidden">
                    <div className="bg-white divide-y divide-gray-200 mb-8">
                        <div className="px-6 py-4 flex justify-between items-center">
                            <p className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Día
                            </p>
                            <p className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Precio
                            </p>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <div className="px-6 py-4 flex justify-between items-center">
                                <p className="whitespace-nowrap">Lunes a Jueves</p>
                                <p className="whitespace-nowrap">$2800</p>
                            </div>
                            <div className="px-6 py-4 flex justify-between items-center">
                                <p className="whitespace-nowrap">Viernes a Domingo</p>
                                <p className="whitespace-nowrap">$4000</p>
                            </div>
                            <div className="px-6 py-4 flex justify-between items-center">
                                <p className="whitespace-nowrap">Desde la web</p>
                                <p className="whitespace-nowrap">$2500</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-2">Oferta de la semana</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-orange-100 p-6 rounded-lg flex flex-col justify-center items-center">
                            <p className="text-gray-700">2 Entradas + 2 Pochoclos + 2 Gaseosas</p>
                            <h3 className="text-gray-800 mt-7">$10000</h3>
                        </div>
                        <div className="bg-orange-100 p-6 rounded-lg flex flex-col justify-center items-center">
                            <p className="text-gray-700">2 Entradas - débito (BanCo, MP, Santander)</p>
                            <h3 className="text-gray-800 mt-7">$5000</h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Precios;