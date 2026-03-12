/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Portfolio = lazy(() => import('./pages/Portfolio'));
const BlogDemo = lazy(() => import('./pages/BlogDemo'));
const EcommerceDemo = lazy(() => import('./pages/EcommerceDemo'));
const SocialDemo = lazy(() => import('./pages/SocialDemo'));

export default function App() {
  return (
    <Router>
      <Suspense fallback={<div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center text-slate-900 dark:text-slate-50">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/demo/blog" element={<BlogDemo />} />
          <Route path="/demo/ecommerce" element={<EcommerceDemo />} />
          <Route path="/demo/social" element={<SocialDemo />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
