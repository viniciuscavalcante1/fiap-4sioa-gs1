
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo and Mission */}
          <div>
            <div className="text-2xl font-bold mb-3">
              <span className="text-red-500">SOS</span>
              <span className="ml-1">CRISE</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Conectando pessoas em situações de emergência com recursos essenciais 
              e oportunidades de ajuda mútua no Brasil.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/alerts" className="text-gray-300 hover:text-white transition-colors">
                  Alertas
                </Link>
              </li>
              <li>
                <Link to="/support-map" className="text-gray-300 hover:text-white transition-colors">
                  Mapa de Apoio
                </Link>
              </li>
              <li>
                <Link to="/how-to-help" className="text-gray-300 hover:text-white transition-colors">
                  Como Ajudar
                </Link>
              </li>
              <li>
                <Link to="/preparedness" className="text-gray-300 hover:text-white transition-colors">
                  Guias de Preparo
                </Link>
              </li>
            </ul>
          </div>

          {/* Emergency Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Emergências</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p><strong>Bombeiros:</strong> 193</p>
              <p><strong>SAMU:</strong> 192</p>
              <p><strong>Polícia:</strong> 190</p>
              <p><strong>Defesa Civil:</strong> 199</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 SOS Crise. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
