import Link from 'next/link'
import { navLinks } from '@/data/navigation'
import { Phone, Mail, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl font-black text-primary">RC</span>
              <span className="text-2xl font-bold text-white">İnşaat</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Kaliteli inşaat oyuncakları ve unutulmaz doğum günü organizasyonları için doğru adres.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-primary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">İletişim</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone size={15} className="text-primary shrink-0" />
                <span>0212 555 66 77</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail size={15} className="text-primary shrink-0" />
                <span>info@rcinsaat.com</span>
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin size={15} className="text-primary shrink-0 mt-0.5" />
                <span>Bağcılar, İstanbul</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-xs">
          © {new Date().getFullYear()} RC İnşaat. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  )
}
