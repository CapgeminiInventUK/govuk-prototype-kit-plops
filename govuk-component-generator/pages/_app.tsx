import '../styles/globals.css'
import '../styles/govuk-frontend-4.3.1.min.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const path = router.pathname;
  return <div className="appContainer">
    <nav>
      <ul>
        <li className={path === '/guidance-page' ? 'active' : ''}>
          <Link
            className="govuk-link govuk-link--no-visited-state govuk-link--no-underline"
            href="/guidance-page">
            Guidance page
          </Link>
        </li>
        <li className={path === '/text-field' ? 'active' : ''}>
          <Link
            className="govuk-link govuk-link--no-visited-state govuk-link--no-underline"
            href="/text-field">
            Text input
          </Link>
        </li>
        <li className={path === '/checkboxes' ? 'active' : ''}>
          <Link
            className="govuk-link govuk-link--no-visited-state govuk-link--no-underline"
            href="/checkboxes">
            Checkboxes
          </Link>
        </li>
        <li className={path === '/radios' ? 'active' : ''}>
          <Link
            className="govuk-link govuk-link--no-visited-state govuk-link--no-underline"
            href="/radios">
            Radios
          </Link>
        </li>
        <li>
          Radios
        </li>
      </ul>
    </nav>
    <Component className="component" {...pageProps} />
  </div>
}
