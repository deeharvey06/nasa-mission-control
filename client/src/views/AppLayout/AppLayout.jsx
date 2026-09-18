import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import Launch from '../Launch';
import History from '../History';
import Upcoming from '../Upcoming';
import useAppLayout from './hooks/useAppLayout';

export default function AppLayout() {
  const {
    launches,
    isPendingLaunch,
    submitLaunch,
    abortLaunch,
    planets,
    error,
    status,
    dismissStatus,
    isLoading,
  } = useAppLayout();
  return (
    <div className='app-shell'>
      <a className='skip-link' href='#main-content'>
        Skip to content
      </a>
      <Header />
      <main className='workspace' id='main-content' tabIndex={-1}>
        {error && (
          <p className='request-error' role='alert'>
            {error}
          </p>
        )}
        {status && (
          <div className='request-status'>
            <span role='status'>{status}</span>
            <button
              type='button'
              className='dismiss-status'
              aria-label='Dismiss notification'
              onClick={dismissStatus}
            >
              <span aria-hidden='true'>×</span>
            </button>
          </div>
        )}
        {isLoading && <p role='status'>Loading destinations…</p>}
        <Routes>
          <Route path='/' element={<Navigate to='/launch' replace />} />
          <Route
            path='/launch'
            element={
              <Launch
                planets={planets}
                submitLaunch={submitLaunch}
                isPendingLaunch={isPendingLaunch}
              />
            }
          />
          <Route
            path='/upcoming'
            element={<Upcoming launches={launches} abortLaunch={abortLaunch} />}
          />
          <Route path='/history' element={<History launches={launches} />} />
          <Route
            path='*'
            element={
              <section className='page'>
                <h1>Page not found</h1>
                <Link to='/launch'>Return to mission planning</Link>
              </section>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
